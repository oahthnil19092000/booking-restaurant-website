import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IMessage } from 'src/app/models/message';
import { IUser } from 'src/app/models/user';
import { IUserLogin } from 'src/app/models/user-login';
import { IUserLoginResponse } from 'src/app/models/user-login-response';
import { IUserSignUp } from 'src/app/models/user-signup';
import { UserService } from 'src/app/services/http/user.service';
import { DialogSevice } from 'src/app/services/loading/dialog';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';

@Component({
  selector: 'app-create-new-employee-dialog',
  templateUrl: './create-new-employee-dialog.component.html',
  styleUrls: ['./create-new-employee-dialog.component.scss']
})
export class CreateNewEmployeeDialogComponent implements OnInit {

  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  name = new FormControl('', [
    Validators.required,
  ]);
  username = new FormControl('', [
    Validators.required,
  ]);
  password = new FormControl('', [
    Validators.required,
  ]);
  birthday = new FormControl('', [
    Validators.required,
  ]);
  signupForm = new FormGroup({
    name: this.name,
    email: this.email,
    username: this.username,
    password: this.password,
    birthday: this.birthday,
  },);
  private userService: UserService;
  private loadingPanel: LoadingPanel;
  private dialogService: DialogSevice;
  constructor(http: HttpClient, dialog: MatDialog, private router: Router) {
    this.userService = new UserService(http);
    this.loadingPanel = new LoadingPanel(dialog);
    this.dialogService = new DialogSevice(dialog);
  }
  ngOnInit(): void {
  }

  onSubmit(button: MatButton) {
    this.loadingPanel.show();
    this.userService.createStaff(<IUserSignUp>this.signupForm.value).subscribe((user: IUser | IMessage | any) => {
      this.loadingPanel.hide();
      if (user.message) {
        this.dialogService.show(user.message);
      } else {
        let message: IMessage = {
          message: "New employee is created!",
          type_message: "success_dialog"
        }
        this.dialogService.show(message);
      }
      button._elementRef.nativeElement.click();
    });
  }

}
