import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IMessage } from 'src/app/models/message';
import { IUserLogin } from 'src/app/models/user-login';
import { IUserLoginResponse } from 'src/app/models/user-login-response';
import { UserService } from 'src/app/services/http/user.service';
import { DialogSevice } from 'src/app/services/loading/dialog';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';
import { IUserSignUp } from '../../models/user-signup';

@Component({
  selector: 'app-sign-up-view',
  templateUrl: './sign-up-view.component.html',
  styleUrls: ['./sign-up-view.component.scss'],
})
export class SignUpViewComponent implements OnInit {
  title: any;

  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required]);
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  birthday = new FormControl('', [Validators.required]);
  signupForm = new FormGroup({
    name: this.name,
    email: this.email,
    username: this.username,
    password: this.password,
    birthday: this.birthday,
  });
  private userService: UserService;
  private loadingPanel: LoadingPanel;
  private dialogService: DialogSevice;
  constructor(http: HttpClient, dialog: MatDialog, private router: Router) {
    this.userService = new UserService(http);
    this.loadingPanel = new LoadingPanel(dialog);
    this.dialogService = new DialogSevice(dialog);
  }
  ngOnInit(): void {
    this.title = 'Hniloaht Restaurant';
  }

  onSubmit() {
    this.loadingPanel.show();
    this.userService
      .signup(<IUserSignUp>this.signupForm.value)
      .subscribe((user: IUserLoginResponse | IMessage | any) => {
        this.loadingPanel.hide();
        if (user?.data) {
          this.dialogService.show(user?.message);
          localStorage.setItem('userInfo', JSON.stringify(user?.data));
          if (user?.data.is_admin) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/customer']);
          }
        } else {
          this.dialogService.show(user);
        }
      });
  }
}
