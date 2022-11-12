import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICart } from 'src/app/models/cart';
import { ICartItem } from 'src/app/models/cart-item';
import { IFood } from 'src/app/models/food';
import { IMessage } from 'src/app/models/message';
import { IOrder } from 'src/app/models/order';
import { ITicket } from 'src/app/models/ticket';
import { FoodService } from 'src/app/services/http/food.service';
import { OrderService } from 'src/app/services/http/order.service';
import { PublicFileService } from 'src/app/services/http/public-file.service';
import { TicketService } from 'src/app/services/http/ticket.service';
import { UserService } from 'src/app/services/http/user.service';
import { DialogSevice } from 'src/app/services/loading/dialog';
import { DialogConfirmSevice } from 'src/app/services/loading/dialog_confirm';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';

@Component({
  selector: 'app-order-for-table',
  templateUrl: './order-for-table.component.html',
  styleUrls: ['./order-for-table.component.scss']
})
export class OrderForTableComponent implements OnInit {

  private userId: Number | any;
  private userToken: String;
  private foodService: FoodService;
  private userService: UserService;
  private orderService: OrderService;
  private publicFileService: PublicFileService;
  private ticketService: TicketService;
  protected foodList: ICart = {
    countAll: 0,
    rows: []
  };
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
    })
  }
  getListOrdering() {
    this.ticketService.getPendingReserveTicketOfCustomer(this.userId).subscribe((ticket: ITicket | null) => {
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
              this.foodList.rows.push(foodItem);
            });
          });
        });
      }
    });

  }

  formatNumber(price: Number, quantity: Number) {
    let number = <number>price * <number>quantity;
    return new Intl.NumberFormat('vi', { style: "currency", currency: "VND" }).format(number);
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



}
