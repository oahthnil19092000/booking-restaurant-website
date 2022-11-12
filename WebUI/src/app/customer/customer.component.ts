import {
  AfterContentChecked,
  AfterViewChecked,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { IUser } from '../models/user';
import { OrderService } from 'src/app/services/http/order.service';
import { TicketService } from 'src/app/services/http/ticket.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/http/user.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  orderingCount: number = 0;
  userInfo: any = null;
  title: any = '';
  private ticketService: TicketService;
  private orderService: OrderService;
  private userService: UserService;
  constructor(private router: Router, http: HttpClient) {
    this.orderService = new OrderService(http);
    this.ticketService = new TicketService(http);
    this.userService = new UserService(http);
    if (localStorage.getItem('userInfo') !== null)
      this.userInfo = JSON.parse(
        <string>localStorage.getItem('userInfo')
      ) as IUser;
    this.title = 'Hniloaht Restaurant';
    localStorage.clear();
    if (this.userInfo !== null) {
      if (!this.userInfo.is_admin) {
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
        this.getQuantityOfFoodsOrdering();
        this.getUserInfo();
      }
    });
  }
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
  ngOnInit(): void {}
  getQuantityOfFoodsOrdering() {
    this.ticketService
      .getPendingOrderTicketOfCustomer(this.userInfo.id)
      .subscribe((ticket) => {
        this.orderService
          .getListWithTicketId(ticket.id)
          .subscribe((orderingList) => {
            this.orderingCount = <number>orderingList.count;
          });
      });
  }
}
