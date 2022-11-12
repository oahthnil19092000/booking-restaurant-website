import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ITable } from 'src/app/models/table';
import { FoodService } from 'src/app/services/http/food.service';
import { OrderService } from 'src/app/services/http/order.service';
import { PublicFileService } from 'src/app/services/http/public-file.service';
import { TicketService } from 'src/app/services/http/ticket.service';
import { UserService } from 'src/app/services/http/user.service';
import { DialogSevice } from 'src/app/services/loading/dialog';
import { DialogConfirmSevice } from 'src/app/services/loading/dialog_confirm';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';
import { TableService } from '../../../services/http/table.service';
import { ITableList } from '../../../models/table-list';
import { ICartItem } from 'src/app/models/cart-item';
import { ITicket } from '../../../models/ticket';
import { IMessage } from '../../../models/message';
import { DiscountService } from '../../../services/http/discount.service';
import { IPagination } from '../../../models/pagination';
import { IDiscountList } from 'src/app/models/discount-list';
import { MatButton } from '@angular/material/button';
import { IDiscount } from '../../../models/discount';
import { BillService } from 'src/app/services/http/bill.service';

@Component({
  selector: 'app-appoval-dialog',
  templateUrl: './appoval-dialog.component.html',
  styleUrls: ['./appoval-dialog.component.scss']
})
export class AppovalDialogComponent implements OnInit {

  protected discountList: IDiscountList;
  protected userId: Number;
  private userService: UserService;
  private discountService: DiscountService;
  private billService: BillService;
  private loadingPanel: LoadingPanel;
  private dialogService: DialogSevice;
  constructor(@Inject(MAT_DIALOG_DATA) public ticketId: Number, http: HttpClient, dialog: MatDialog) {
    this.loadingPanel = new LoadingPanel(dialog);
    this.billService = new BillService(http);
    this.userService = new UserService(http);
    this.discountService = new DiscountService(http);
    this.dialogService = new DialogSevice(dialog);
    this.discountList = {
      page: 0,
      rows: [],
      size: 0,
      count: 0
    };
    this.userId = 0;
  }
  discount_id = new FormControl(0, [
    Validators.required,
  ]);
  approvalForm = new FormGroup({
    discount_id: this.discount_id,
  },);
  ngOnInit(): void {
    this.getDiscountList();
    this.getUserId();
  }
  getUserId() {
    let refreshToken = <string>localStorage.getItem('SessionID') as string;
    this.userService.getIdByToken(<String>refreshToken).subscribe((userID: Number | any) => {
      this.userId = userID;
    });
  }
  getDiscountList() {
    let pagination: IPagination = {
      page: 1,
      size: 1000,
      field: null,
      is_reverse_sort: null
    }
    this.discountService.getAll(pagination).subscribe((discountlist: IDiscountList) => {
      this.discountList = discountlist;
    });
  }
  renderDiscountDetail(discountItem: IDiscount) {
    return discountItem.percent != null ? discountItem.percent + "%" : this.formatNumber(discountItem.amount);
  }
  formatNumber(price: Number, quantity: Number = 1) {
    let number = <number>price * <number>quantity;
    return new Intl.NumberFormat('vi', { style: "currency", currency: "VND" }).format(number);
  }
  onSubmit(button: MatButton) {
    if (this.approvalForm.value.discount_id != null) {
      this.loadingPanel.show();
      this.billService.createBill(this.ticketId, this.userId, <Number>this.approvalForm.value.discount_id).subscribe(() => {
        this.loadingPanel.hide();
        button._elementRef.nativeElement.click();
      });
    }

  }
}
