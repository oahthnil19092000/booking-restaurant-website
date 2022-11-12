import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/http/user.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  userInfo: any = null;
  userRefreshToken: any = null;
  private userService: UserService;
  public height = window.innerHeight;
  constructor(private router: Router, http: HttpClient) {
    this.userService = new UserService(http);
    if (localStorage.getItem('SessionID') !== null)
      this.userRefreshToken = localStorage.getItem("SessionID");
  }

  ngOnInit(): void {
    if (this.userRefreshToken !== null) {
      this.getUserInfo();
    }
  }
  heightScreen() {
    return "height : " + this.getHeight() + "px";
  }
  getHeight() {
    this.height = window.innerHeight - 2;
    return this.height;
  }
  goToBack() {
    if (this.userRefreshToken == null) {
      this.router.navigate(['/login']);
    } else {
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
      if (this.userInfo.is_admin) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/customer']);
      }
    }
  }
  getUserInfo() {
    if (this.userRefreshToken != null)
      this.userService.getIdByToken(this.userRefreshToken).subscribe((userID: any) => {
        this.userService.getInfo(userID).subscribe((userDetail: IUser | any) => {
          this.userInfo = userDetail;
        })
      })
  }
}
