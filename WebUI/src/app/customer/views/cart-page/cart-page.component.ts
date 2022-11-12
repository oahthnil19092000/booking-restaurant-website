import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { ICart } from 'src/app/models/cart';
import { ICartItem } from 'src/app/models/cart-item';
import { FoodService } from 'src/app/services/http/food.service';
import { OrderService } from 'src/app/services/http/order.service';
import { TicketService } from 'src/app/services/http/ticket.service';
import { UserService } from 'src/app/services/http/user.service';
import { IOrder } from '../../../models/order';
import { IFood } from '../../../models/food';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PublicFileService } from 'src/app/services/http/public-file.service';
import { ICity } from 'src/app/models/city';
import { IDistrict } from 'src/app/models/district';
import { ITicketCreate } from 'src/app/models/ticket-create';
import { MatDialog } from '@angular/material/dialog';
import { DialogSevice } from 'src/app/services/loading/dialog';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';
import { Router } from '@angular/router';
import { DialogConfirmSevice } from 'src/app/services/loading/dialog_confirm';
import { ITicket } from '../../../models/ticket';
import { IMessage } from '../../../models/message';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  private userId: Number | any;
  private userToken: String;
  private foodService: FoodService;
  private userService: UserService;
  private orderService: OrderService;
  private publicFileService: PublicFileService;
  private ticketService: TicketService;
  protected foodChecked: Boolean[] = [];
  protected citiesList: ICity[] = [];
  protected districtsList: IDistrict[] = [];
  protected wardsList: IDistrict[] = [];
  address = new FormControl('', [
    Validators.required,
  ]);
  ward = new FormControl('', [
    Validators.required,
  ]);
  district = new FormControl('', [
    Validators.required,
  ]);
  city = new FormControl('', [
    Validators.required,
  ]);
  phone = new FormControl('', [
    Validators.required,
    Validators.pattern("[0-9 ]{10}"),
  ]);
  orderForm = new FormGroup({
    phone: this.phone,
    address: this.address,
    ward: this.ward,
    district: this.district,
    city: this.city,
  },);
  protected foodList: ICart = {
    countAll: 0,
    rows: []
  };
  protected payWithVNPay: Boolean = false;
  private dialogService: DialogSevice;
  private loadingPanel: LoadingPanel;
  private confirmDialog: DialogConfirmSevice;
  constructor(http: HttpClient, dialog: MatDialog, private router: Router) {
    this.dialogService = new DialogSevice(dialog);
    this.loadingPanel = new LoadingPanel(dialog);
    this.confirmDialog = new DialogConfirmSevice(dialog);
    this.foodService = new FoodService(http);
    this.orderService = new OrderService(http);
    this.publicFileService = new PublicFileService(http);
    this.ticketService = new TicketService(http);
    this.userService = new UserService(http);
    this.userToken = <string>localStorage.getItem('SessionID') as string;
  }


  ngOnInit(): void {
    this.foodList = {
      countAll: 0,
      rows: []
    };
    this.userService.getIdByToken(this.userToken).subscribe((userID) => {
      this.userId = userID;
      this.getListOrdering();
      this.getCitiesList();
    })
  }
  getCitiesList() {
    this.publicFileService.getCitiesList().subscribe((citiesList) => {
      this.citiesList = <ICity[]>Object.values(citiesList);
    })
  }
  getListOrdering() {
    this.ticketService.getPendingOrderTicketOfCustomer(this.userId).subscribe((ticket: ITicket | null) => {
      if (ticket != null) {
        this.orderService.getListWithTicketId(ticket.id).subscribe((orderingList) => {
          orderingList.rows.forEach((orderingItem: IOrder, index: number) => {
            this.foodService.getById(orderingItem.food_id).subscribe((food) => {
              this.foodList.countAll = orderingList.count;
              let foodItem: ICartItem = {
                quantity: orderingItem.quantity,
                ticket: ticket,
                food: <IFood>food
              }
              this.foodChecked.push(false);
              this.foodList.rows.push(foodItem);
            });
          });
        });
      } else {
        let ticketCreate: ITicketCreate = {
          customer_address: '',
          customer_id: this.userId,
          customer_phone: '',
          payment_date: null,
          received_date: new Date(),
          table_id: 0,
          type_party_id: 0,
        }
        this.ticketService.createTicket(ticketCreate).subscribe((ticket: ITicket | any) => {
          this.orderService.getListWithTicketId(ticket.id).subscribe((orderingList) => {
            orderingList.rows.forEach((orderingItem: IOrder, index: number) => {
              this.foodService.getById(orderingItem.food_id).subscribe((food) => {
                this.foodList.countAll = orderingList.count;
                let foodItem: ICartItem = {
                  quantity: orderingItem.quantity,
                  ticket: ticket,
                  food: <IFood>food
                }
                this.foodChecked.push(false);
                this.foodList.rows.push(foodItem);
              });
            });
          });
        })
      }
    });

  }

  formatNumber(price: Number, quantity: Number) {
    let number = <number>price * <number>quantity;
    return new Intl.NumberFormat('vi', { style: "currency", currency: "VND" }).format(number);
  }

  citySelected(cityCode: Number) {
    this.publicFileService.getDistrictsList(cityCode).subscribe((districtsList) => {
      this.districtsList = <IDistrict[]>Object.values(districtsList);
    })
  }

  districtSelected(districtCode: Number) {
    this.publicFileService.getWardsList(districtCode).subscribe((wardsList) => {
      this.wardsList = <IDistrict[]>Object.values(wardsList);
    })
  }


  async deleteIteminCart(food_id: Number) {
    let isConfirm = await this.confirmDialog.show("confirm_delete");
    isConfirm.subscribe((result: any) => {
      if (result) {
        this.loadingPanel.show();
        let ticket_id = this.foodList.rows[0].ticket.id ?? 0;
        this.orderService.getOrderWithTicketAndFodd(ticket_id, food_id).subscribe((orderItem) => {
          this.orderService.deteleFoodNotOrder(orderItem.id).subscribe(() => {
            this.ngOnInit();
            this.loadingPanel.hide();
          });
        });
      }
    });
  }

  changeQuantity($event: any, food_id: Number) {
    if ($event.target.value > 0 && $event.target.value <= 50) {
      this.loadingPanel.show();
      let ticket_id = this.foodList.rows[0].ticket.id ?? 0;
      this.orderService.getOrderWithTicketAndFodd(ticket_id, food_id).subscribe((orderItem) => {
        this.orderService.updateOrder(orderItem.id, $event.target.value, ticket_id, food_id).subscribe(() => {
          this.ngOnInit();
          this.loadingPanel.hide();
        });
      });
    } else {
      let message: IMessage = {
        message: "This quantity is limit on 1 - 50!",
        type_message: "error_dialog"
      }
      this.dialogService.show(message);
    }

  }
  countFoodCheck() {
    let count = 0;
    this.foodChecked.forEach((value: Boolean) => {
      if (value) count++;
    });
    return count == 0;
  }
  onSubmit() {
    this.loadingPanel.show();
    let ticket_id = this.foodList.rows[0].ticket.id;
    let ticket: ITicketCreate = {
      customer_id: this.userId,
      type_party_id: 0,
      table_id: 0,
      received_date: new Date(),
      payment_date: new Date(),
      customer_phone: <String>this.orderForm.value.phone,
      customer_address: this.orderForm.value.address + ", " + this.orderForm.value.ward,
    }
    let foodNotOrderList: Number[] = [];
    this.foodChecked.forEach((element, index) => {
      if (!element) {
        foodNotOrderList.push(this.foodList.rows[index].food.id);
      }
    });
    foodNotOrderList.forEach((food) => {
      this.orderService.getOrderWithTicketAndFodd(ticket_id, food).subscribe((order) => {
        if (order != null)
          this.orderService.deteleFoodNotOrder(order.id).subscribe();
      });

    });
    this.ticketService.order(ticket_id, ticket).subscribe(async (ticketRes) => {
      this.loadingPanel.hide();
      let closed = await this.dialogService.show(ticketRes);
      closed.subscribe((value: any) => {
        if (this.payWithVNPay) {
          window.open('http://localhost:3000/payment/create_payment_url/' + ticket_id);
        }

        this.ngOnInit();
      })
    });

  }

}
