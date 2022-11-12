import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IUser } from '../models/user';
import { UserService } from '../services/http/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  userInfo: any = null;
  title: any = null;
  private userService: UserService;
  constructor(private router: Router, http: HttpClient) {
    this.userService = new UserService(http);
    if (localStorage.getItem('userInfo') !== null)
      this.userInfo = JSON.parse(
        <string>localStorage.getItem('userInfo')
      ) as IUser;
    this.title = 'Hniloaht Restaurant';
    localStorage.clear();
    if (this.userInfo !== null) {
      if (this.userInfo.is_admin) {
        localStorage.setItem('SessionID', this.userInfo.refreshToken);
      } else {
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
    router.events.subscribe((val) => {
      // see also

      if (val instanceof NavigationEnd) {
        this.getUserInfo();
        if (val.url === '/admin') {
          this.router.navigate(['/admin/order-list']);
        }
      }
    });
  }

  ngOnInit(): void {}
  getUserInfo() {
    if (this.userInfo !== null)
      this.userService
        .getIdByToken(this.userInfo.refreshToken)
        .subscribe((userID: any) => {
          this.userService
            .getInfo(userID)
            .subscribe((userDetail: IUser | any) => {
              this.userInfo = userDetail;
            });
        });
  }
}
