import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IFood } from 'src/app/models/food';
import { IFoodList } from 'src/app/models/food-list';
import { IMainIngredientDetail } from 'src/app/models/main-ingredient-detail';
import { IOrder } from 'src/app/models/order';
import { IPagination } from 'src/app/models/pagination';
import { FoodService } from 'src/app/services/http/food.service';
import { MainIngredientDetailService } from 'src/app/services/http/main-ingredient-detail.service';
import { UserService } from 'src/app/services/http/user.service';
import { DialogSevice } from 'src/app/services/loading/dialog';
import { DialogConfirmSevice } from 'src/app/services/loading/dialog_confirm';
import { DialogFoodFormAddOrCreateSevice } from 'src/app/services/loading/dialog_food_form_add_or_create';
import { FoodInfoDialogSevice } from 'src/app/services/loading/food_info_dialog';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';
import { OrderService } from '../../../services/http/order.service';
import { IMessage } from '../../../models/message';

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.scss']
})
export class MenuDialogComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  private userService: UserService;
  private orderService: OrderService;
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
    'order',
  ];
  public listFoods: IFoodList | any;
  dataSource = new MatTableDataSource([]);
  private mainIngredientDetailService: MainIngredientDetailService;
  public searchText: String | null = null;
  constructor(@Inject(MAT_DIALOG_DATA) public ticketId: Number, dialog: MatDialog, private router: Router, http: HttpClient) {
    this.mainIngredientDetailService = new MainIngredientDetailService(http);
    this.foodService = new FoodService(http);
    this.confirmDialog = new DialogConfirmSevice(dialog);
    this.foodCreateOrUpdateDialog = new DialogFoodFormAddOrCreateSevice(dialog);
    this.foodDialog = new FoodInfoDialogSevice(dialog);
    this.dialog = new DialogSevice(dialog);
    this.loadingPanel = new LoadingPanel(dialog);
    this.userService = new UserService(http);
    this.orderService = new OrderService(http);
    this.pagination = {
      page: 1,
      size: 10,
      field: null,
      is_reverse_sort: null,
    };
  }

  ngAfterViewInit() { }
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

  selectItem(foodId: Number, quantity: any) {
    if (parseInt(quantity.value) > 0) {
      let order: IOrder = {
        food_id: foodId,
        ticket_id: this.ticketId,
        quantity: <Number>quantity.value
      }
      this.orderService.order(order).subscribe(() => {
        let message: IMessage = {
          message: "This food was ordered!",
          type_message: "success_dialog"
        }
        this.dialog.show(message);
      });
    } else {
      let message: IMessage = {
        message: "Can't order when the quantity is 0!",
        type_message: "error_dialog"
      }
      this.dialog.show(message);
    }

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
  search(input: any) {
    this.searchText = input.value.trim() != '' ? input.value : null;
    this.getFoodList();
  }

}
