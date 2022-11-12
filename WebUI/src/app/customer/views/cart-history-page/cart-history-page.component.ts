import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICart } from 'src/app/models/cart';
import { ICartItem } from 'src/app/models/cart-item';
import { ICity } from 'src/app/models/city';
import { IFood } from 'src/app/models/food';
import { IOrder } from 'src/app/models/order';
import { ITable } from 'src/app/models/table';
import { ITicket } from 'src/app/models/ticket';
import { ITicketCreate } from 'src/app/models/ticket-create';
import { ITicketOrderdList } from 'src/app/models/ticket-ordered-list';
import { FoodService } from 'src/app/services/http/food.service';
import { OrderService } from 'src/app/services/http/order.service';
import { PublicFileService } from 'src/app/services/http/public-file.service';
import { TicketService } from 'src/app/services/http/ticket.service';
import { UserService } from 'src/app/services/http/user.service';
import { DialogSevice } from 'src/app/services/loading/dialog';
import { DialogConfirmSevice } from 'src/app/services/loading/dialog_confirm';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';
import { IUser } from '../../../models/user';
import { TableService } from '../../../services/http/table.service';
import { TypePartyService } from '../../../services/http/type-of-party.service';
import { BillService } from '../../../services/http/bill.service';
import { IBillResponse } from 'src/app/models/bill-response';
import { CommentService } from '../../../services/http/comment.service';
import { IComment } from '../../../models/comment';
import { IMessage } from '../../../models/message';
import { DialogCommentSevice } from '../../../services/loading/dialog_comment';
import { async } from '@angular/core/testing';
import { IBill } from 'src/app/models/bill';
import { DialogFoodDetailSevice } from 'src/app/services/loading/dialog_detail_ticket';

@Component({
  selector: 'app-cart-history-page',
  templateUrl: './cart-history-page.component.html',
  styleUrls: ['./cart-history-page.component.scss']
})
export class CartHistoryPageComponent implements OnInit {

  private userId: Number | any;
  private userToken: String;
  private foodService: FoodService;
  private commentService: CommentService;
  private typePartyService: TypePartyService;
  private userService: UserService;
  private orderService: OrderService;
  private tableService: TableService;
  private billService: BillService;
  private publicFileService: PublicFileService;
  private ticketService: TicketService;


  protected orderedList: ITicketOrderdList = {
    count: 0,
    rows: []
  };
  private dialogService: DialogSevice;
  private loadingPanel: LoadingPanel;
  private confirmDialog: DialogConfirmSevice;
  private foodDetailDialog: DialogFoodDetailSevice;
  private commentDialog: DialogCommentSevice;
  constructor(http: HttpClient, dialog: MatDialog, private router: Router) {
    this.dialogService = new DialogSevice(dialog);
    this.foodDetailDialog = new DialogFoodDetailSevice(dialog);
    this.loadingPanel = new LoadingPanel(dialog);
    this.confirmDialog = new DialogConfirmSevice(dialog);
    this.commentDialog = new DialogCommentSevice(dialog);
    this.typePartyService = new TypePartyService(http);
    this.foodService = new FoodService(http);
    this.commentService = new CommentService(http);
    this.orderService = new OrderService(http);
    this.tableService = new TableService(http);
    this.publicFileService = new PublicFileService(http);
    this.billService = new BillService(http);
    this.ticketService = new TicketService(http);
    this.userService = new UserService(http);
    this.userToken = <string>localStorage.getItem('SessionID') as string;
  }

  ngOnInit(): void {
    this.orderedList = {
      count: 0,
      rows: []
    };
    this.userService.getIdByToken(this.userToken).subscribe((userID) => {
      this.userId = userID;
      this.getOderedList();
    })
  }

  getOderedList() {
    this.ticketService.getOrderedTicket(this.userId).subscribe((ticketOrderedList) => {
      let promise = new Promise((resolveOuter) => {
        ticketOrderedList.rows.forEach((ticketOrdered: any, index: Number) => {
          resolveOuter(this.userService.getInfo(ticketOrdered.customer_id).subscribe((user: any) => {
            ticketOrderedList.rows[<number>index].customer = user;
            delete ticketOrderedList.rows[<number>index].customer_id;
            resolveOuter(this.tableService.getTableInfo(ticketOrdered.table_id).subscribe((table: ITable) => {
              ticketOrderedList.rows[<number>index].table = table;
              delete ticketOrderedList.rows[<number>index].table_id;
              resolveOuter(this.typePartyService.getTypePartyInfo(ticketOrdered.type_party_id).subscribe((type_party) => {
                ticketOrderedList.rows[<number>index].type_party = type_party;
                delete ticketOrderedList.rows[<number>index].type_party_id;
                resolveOuter(
                  this.billService.getByTicketId(ticketOrdered.id).subscribe((bill: IBill) => {
                    ticketOrderedList.rows[<number>index].bill = bill;
                    if (bill == null) {
                      ticketOrderedList.rows[<number>index].status = 0;
                      ticketOrderedList.rows[<number>index].comment = null;
                    } else {
                      if (bill.status) {
                        ticketOrderedList.rows[<number>index].status = 1;
                        this.commentService.getCommentWithBillId(bill.id).subscribe((comment: IComment | IMessage | any) => {
                          if (comment.message != undefined) {
                            ticketOrderedList.rows[<number>index].comment = {
                              id: 0,
                              bill_id: 0,
                              content: '',
                              point: 0,
                              createdAt: new Date(),
                              updatedAt: new Date()
                            };
                          } else {
                            ticketOrderedList.rows[<number>index].comment = comment;
                          }
                        })
                      } else {
                        ticketOrderedList.rows[<number>index].status = -1;
                        ticketOrderedList.rows[<number>index].comment = null;
                      }
                    }

                  })
                )
              }))
            }));
          }));
        });
      });
      promise.then(() => {
        this.orderedList = ticketOrderedList;
      })
    })
  }
  renderStatus(status: Number) {
    if (status == 0) {
      return "Pending";
    } else if (status == 1) {
      return "Completed";
    } else {
      return "Canceled";
    }
  }
  renderDate(date: String | any) {
    if (date != undefined) {
      let datetime = new Date(date);
      return datetime.toLocaleDateString()
    }
    else return '';
  }
  renderTime(date: String | any) {
    if (date != undefined) {
      let datetime = new Date(date);
      return datetime.toLocaleTimeString()
    }
    else return '';
  }
  renderScore(comment: IComment | any) {
    return comment != null ? 'Score: ' + comment.point : '';
  }
  renderComment(comment: IComment | any) {
    return comment != null ? comment.content : '';
  }
  cancelTicket(ticket_id: Number) {
    this.billService.createBill(ticket_id).subscribe((bill: IBillResponse) => {
      this.billService.cancel(bill.data.id).subscribe(() => {
        this.getOderedList();
      });
    })
  }
  showCommentDialog(ticket_id: Number) {
    this.billService.getByTicketId(ticket_id).subscribe((bill: IBill) => {
      this.commentDialog.show(bill.id).then((value) => {
        value.subscribe(() => {
          this.ngOnInit();
        })
      })
    })
  }
  openDetail(ticketId: Number) {
    this.foodDetailDialog.show(ticketId);
  }
}
