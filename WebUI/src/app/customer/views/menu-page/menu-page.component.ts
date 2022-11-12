import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { IFoodList } from 'src/app/models/food-list';
import { IMainIngredientDetail } from 'src/app/models/main-ingredient-detail';
import { IMessage } from 'src/app/models/message';
import { IPagination } from 'src/app/models/pagination';
import { FoodService } from 'src/app/services/http/food.service';
import { MainIngredientDetailService } from 'src/app/services/http/main-ingredient-detail.service';
import { MainIngredientService } from 'src/app/services/http/main-ingredient.service';
import { TicketService } from 'src/app/services/http/ticket.service';
import { UserService } from 'src/app/services/http/user.service';
import { DialogSevice } from 'src/app/services/loading/dialog';
import { FoodDialogSevice } from 'src/app/services/loading/food_dialog';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';
import { CustomerComponent } from '../../customer.component';
import { IMainIngredient } from '../../../models/main-ingredient';
import { IFood } from '../../../models/food';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit {

  myControl = new FormControl<string | IMainIngredient>('');
  options: IMainIngredient[] = [];
  filteredOptions!: Observable<IMainIngredient[]>;

  private _filter(name: string): IMainIngredient[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }


  protected listFoods: IFoodList | IMessage | any;
  protected foodDetail: IMainIngredientDetail[] | any;
  private foodService: FoodService;
  private userService: UserService;
  private mainIngredientDetailService: MainIngredientDetailService;
  private mainIngredientService: MainIngredientService;
  private loadingPanel: LoadingPanel;
  private dialogService: DialogSevice;
  private foodDialogSevice: FoodDialogSevice;
  private userToken: String;
  public searchText: String | null = null;
  constructor(http: HttpClient, dialog: MatDialog, private router: Router) {
    this.foodService = new FoodService(http);
    this.userService = new UserService(http);
    this.mainIngredientDetailService = new MainIngredientDetailService(http);
    this.mainIngredientService = new MainIngredientService(http);
    this.loadingPanel = new LoadingPanel(dialog);
    this.dialogService = new DialogSevice(dialog);
    this.foodDialogSevice = new FoodDialogSevice(dialog);
    this.userToken = <string>localStorage.getItem('SessionID') as string;
  }

  displayFn(mainIngredient: IMainIngredient): string {
    return mainIngredient && mainIngredient.name ? <string>mainIngredient.name : '';
  }
  ngOnInit(): void {
    this.getFoodList();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
    this.mainIngredientService.getAll().subscribe((mainList: IMainIngredient[] | any) => {
      this.options = mainList;
    })
  }

  loadPageData(page: any) {
    this.getFoodList(page?.pageIndex + 1);
  }
  selectItem(food: any) {
    this.mainIngredientDetailService.getList(food.id).subscribe((data) => {
      this.foodDetail = data;
      this.userService.getIdByToken(this.userToken).subscribe(async (userID) => {
        let value = await this.foodDialogSevice.show(food, this.foodDetail, parseInt(userID.toString()));
        value.subscribe((result: any) => {
          if (result) {

          }
        });
      })
    });
  }

  getFoodList(page: number = 1) {
    this.loadingPanel.show();
    let pagination: IPagination = {
      size: 12,
      page: page,
      field: null,
      is_reverse_sort: null
    }
    this.foodService.getList(pagination, this.searchText).subscribe((listFoods: IFoodList | IMessage | any) => {
      this.loadingPanel.hide();
      if (listFoods?.rows) {
        this.listFoods = listFoods;
      } else {
        this.dialogService.show(listFoods?.message);
      }
    });
  }
  formatNumber(number: number) {
    return new Intl.NumberFormat('vi', { style: "currency", currency: "VND" }).format(number);
  }

  search(input: any) {
    this.searchText = input.value.trim() != "" ? input.value : null;
    this.getFoodList();
  }
  searchIngredient() {
    this.foodService.getFoodWithMainIngredientId((this.myControl.value as IMainIngredient).id).subscribe((foodList: IFood[] | any) => {
      this.listFoods.rows = foodList;
    })
  }

}
