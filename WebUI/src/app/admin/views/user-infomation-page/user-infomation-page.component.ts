import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FoodService } from 'src/app/services/http/food.service';
import { OrderService } from 'src/app/services/http/order.service';
import { PublicFileService } from 'src/app/services/http/public-file.service';
import { TableService } from 'src/app/services/http/table.service';
import { TicketService } from 'src/app/services/http/ticket.service';
import { UserService } from 'src/app/services/http/user.service';
import { DialogSevice } from 'src/app/services/loading/dialog';
import { DialogConfirmSevice } from 'src/app/services/loading/dialog_confirm';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';
import { IUser } from '../../../models/user';
import { IMessage } from '../../../models/message';

@Component({
  selector: 'app-user-infomation-page',
  templateUrl: './user-infomation-page.component.html',
  styleUrls: ['./user-infomation-page.component.scss']
})
export class UserInfomationPageComponent implements OnInit {
  id = new FormControl(0, [
    Validators.required,
  ]);
  name = new FormControl('', [
    Validators.required,
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  birthday = new FormControl(new Date(), [
    Validators.required,
  ]);
  updateUserInfoForm = new FormGroup({
    id: this.id,
    name: this.name,
    email: this.email,
    birthday: this.birthday,
  },);

  protected maxBirthdayDate: Date;
  protected userDetail: IUser;
  protected isUpdate: Boolean = false;
  private userToken: String;
  private foodService: FoodService;
  private userService: UserService;
  private orderService: OrderService;
  private publicFileService: PublicFileService;
  private ticketService: TicketService;
  private tableService: TableService;
  private dialogService: DialogSevice;
  private loadingPanel: LoadingPanel;
  private confirmDialog: DialogConfirmSevice;
  constructor(http: HttpClient, dialog: MatDialog, private router: Router) {
    this.dialogService = new DialogSevice(dialog);
    this.loadingPanel = new LoadingPanel(dialog);
    this.confirmDialog = new DialogConfirmSevice(dialog);
    this.foodService = new FoodService(http);
    this.tableService = new TableService(http);
    this.orderService = new OrderService(http);
    this.publicFileService = new PublicFileService(http);
    this.ticketService = new TicketService(http);
    this.userService = new UserService(http);
    this.userToken = <string>localStorage.getItem('SessionID') as string;
    this.userDetail = {
      id: 0,
      name: '',
      email: '',
      username: '',
      password: '',
      birthday: new Date(),
      is_admin: false,
      status: true,
      refreshToken: '',
      updatedAt: new Date(),
      createdAt: new Date(),
    }
    const currentYear = new Date();
    this.maxBirthdayDate = new Date(currentYear.getFullYear(), currentYear.getMonth(), currentYear.getDate());
  }


  renderDate(date: Date) {
    return new Date(date).toLocaleDateString("fr-BE");
  }

  ngOnInit(): void {
    this.loadingPanel.show()
    this.userService.getIdByToken(this.userToken).subscribe((userID: any) => {
      this.userService.getInfo(userID).subscribe((userDetail: IUser | any) => {
        this.userDetail = userDetail;
        this.updateUserInfoForm.setValue({ id: <number>this.userDetail.id, name: <string>this.userDetail.name, email: <string>this.userDetail.email, birthday: this.userDetail.birthday });
        this.loadingPanel.hide();
      })
    })
  }
  showForm() {
    this.isUpdate = true;
  }
  hideForm() {
    this.isUpdate = false;
  }
  onSubmit() {
    this.loadingPanel.show()
    this.userService.updateInfo(this.updateUserInfoForm.value).subscribe((isUpdateMessage: IMessage) => {
      this.loadingPanel.hide();
      this.dialogService.show(isUpdateMessage);
      this.ngOnInit();
      this.hideForm();
    })

  }
}
