import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BillService } from 'src/app/services/http/bill.service';
import { CommentService } from 'src/app/services/http/comment.service';
import { FoodService } from 'src/app/services/http/food.service';
import { OrderService } from 'src/app/services/http/order.service';
import { PublicFileService } from 'src/app/services/http/public-file.service';
import { TableService } from 'src/app/services/http/table.service';
import { TicketService } from 'src/app/services/http/ticket.service';
import { TypePartyService } from 'src/app/services/http/type-of-party.service';
import { UserService } from 'src/app/services/http/user.service';
import { DialogSevice } from 'src/app/services/loading/dialog';
import { DialogCommentSevice } from 'src/app/services/loading/dialog_comment';
import { DialogConfirmSevice } from 'src/app/services/loading/dialog_confirm';
import { DialogFoodDetailSevice } from 'src/app/services/loading/dialog_detail_ticket';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';
import { IMessage } from '../../../models/message';

@Component({
  selector: 'app-change-password-page',
  templateUrl: './change-password-page.component.html',
  styleUrls: ['./change-password-page.component.scss']
})
export class ChangePasswordPageComponent implements OnInit {

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
  private dialogService: DialogSevice;
  private loadingPanel: LoadingPanel;
  private confirmDialog: DialogConfirmSevice;
  private commentDialog: DialogCommentSevice;
  private foodDetailDialog: DialogFoodDetailSevice;
  protected isHidePassword: Boolean;
  password = new FormControl('', [
    Validators.required,
  ]);
  confirmPassword = new FormControl('', [
    Validators.required,
  ]);
  changePasswordForm = new FormGroup({
    password: this.password,
    confirmPassword: this.confirmPassword,
  },);
  constructor(http: HttpClient, dialog: MatDialog, private router: Router) {
    this.foodDetailDialog = new DialogFoodDetailSevice(dialog);
    this.dialogService = new DialogSevice(dialog);
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
    this.isHidePassword = true;
  }
  ngOnInit(): void {
    this.userService.getIdByToken(this.userToken).subscribe((userID) => {
      this.userId = userID;
    })
  }
  checkNotMatchPassword() {
    let temp = this.changePasswordForm.value;
    return temp.password != temp.confirmPassword;
  }
  onSubmit() {
    this.loadingPanel.show();
    this.userService.updatePassword(this.userId, new String(this.changePasswordForm.value.password)).subscribe((result: IMessage) => {
      this.loadingPanel.hide();
      this.dialogService.show(result);
      this.changePasswordForm.setValue({ password: "", confirmPassword: "" });
    })
  }
}
