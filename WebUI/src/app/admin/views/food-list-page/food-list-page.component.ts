import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/http/user.service';
import { IPagination } from '../../../models/pagination';
import { IUserList } from '../../../models/user-list';
import { IMessage } from '../../../models/message';
import { MatTableDataSource } from '@angular/material/table';
import { DialogConfirmSevice } from 'src/app/services/loading/dialog_confirm';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';
import { MatDialog } from '@angular/material/dialog';
import { DialogSevice } from '../../../services/loading/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { IFoodList } from 'src/app/models/food-list';
import { FoodService } from 'src/app/services/http/food.service';
import { MainIngredientDetailService } from 'src/app/services/http/main-ingredient-detail.service';
import { IFood } from '../../../models/food';
import { FoodInfoDialogSevice } from '../../../services/loading/food_info_dialog';
import { IMainIngredientDetail } from 'src/app/models/main-ingredient-detail';
import { DialogFoodFormAddOrCreateSevice } from 'src/app/services/loading/dialog_food_form_add_or_create';

@Component({
  selector: 'app-food-list-page',
  templateUrl: './food-list-page.component.html',
  styleUrls: ['./food-list-page.component.scss'],
})
export class FoodListPageComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  private userService: UserService;
  public pagination: IPagination;
  private confirmDialog: DialogConfirmSevice;
  private foodDialog: FoodInfoDialogSevice;
  private foodCreateOrUpdateDialog: DialogFoodFormAddOrCreateSevice;
  private dialog: DialogSevice;
  private loadingPanel: LoadingPanel;
  private foodService: FoodService;
  displayedColumns: string[] = [
    'id',
    'name',
    'price',
    'detail',
    'edit',
    'action',
  ];
  public listFoods: IFoodList | any;
  dataSource = new MatTableDataSource([]);
  private mainIngredientDetailService: MainIngredientDetailService;
  public searchText: String | null = null;
  constructor(dialog: MatDialog, private router: Router, http: HttpClient) {
    this.mainIngredientDetailService = new MainIngredientDetailService(http);
    this.foodService = new FoodService(http);
    this.confirmDialog = new DialogConfirmSevice(dialog);
    this.foodCreateOrUpdateDialog = new DialogFoodFormAddOrCreateSevice(dialog);
    this.foodDialog = new FoodInfoDialogSevice(dialog);
    this.dialog = new DialogSevice(dialog);
    this.loadingPanel = new LoadingPanel(dialog);
    this.userService = new UserService(http);
    this.pagination = {
      page: 1,
      size: 10,
      field: null,
      is_reverse_sort: null,
    };
  }

  ngAfterViewInit() {}
  ngOnInit(): void {
    this.getFoodList();
  }
  getFoodList() {
    this.loadingPanel.show();
    this.foodService
      .getList(this.pagination, this.searchText)
      .subscribe((listFoods: IFoodList | any) => {
        this.loadingPanel.hide();
        this.listFoods = listFoods;
        this.dataSource.data = listFoods.rows;
      });
  }
  renderDate(date: String | any) {
    if (date != undefined) {
      let datetime = new Date(date);
      return datetime.toLocaleDateString();
    } else return '';
  }
  async deleteCustomer(customerId: Number) {
    let isConfirm = await this.confirmDialog.show('confirm_delete');
    isConfirm.subscribe((result: any) => {
      if (result) {
        this.loadingPanel.show();
        this.foodService.delete(customerId).subscribe((message: IMessage) => {
          this.loadingPanel.hide();
          this.ngOnInit();
          this.dialog.show(message);
        });
      }
    });
  }

  selectItem(food: IFood) {
    this.mainIngredientDetailService
      .getList(food.id)
      .subscribe((data: IMainIngredientDetail[] | any) => {
        this.foodDialog.show(food, data);
      });
  }

  loadPageData(page: any) {
    this.pagination.page = page?.pageIndex + 1;
    this.ngOnInit();
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.pagination.field = sortState.active;
      this.pagination.is_reverse_sort =
        sortState.direction == 'desc' ? 'true' : 'false';
    } else {
      this.pagination.field = null;
      this.pagination.is_reverse_sort = null;
    }
    this.ngOnInit();
  }

  formatNumber(price: Number) {
    let number = <number>price;
    return new Intl.NumberFormat('vi', {
      style: 'currency',
      currency: 'VND',
    }).format(number);
  }
  addFood() {
    this.foodCreateOrUpdateDialog.show(0);
  }
  updateFood(foodId: Number) {
    this.foodCreateOrUpdateDialog.show(foodId);
  }
  search(input: any) {
    this.searchText = input.value.trim() != '' ? input.value : null;
    this.getFoodList();
  }
}
