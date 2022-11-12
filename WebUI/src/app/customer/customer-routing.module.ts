import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailTicketDialogComponent } from '../components/detail-ticket-dialog/detail-ticket-dialog.component';
import { CustomerComponent } from './customer.component';
import { CartHistoryPageComponent } from './views/cart-history-page/cart-history-page.component';
import { CartPageComponent } from './views/cart-page/cart-page.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { MenuPageComponent } from './views/menu-page/menu-page.component';
import { ReserveTablePageComponent } from './views/reserve-table-page/reserve-table-page.component';
import { UserInfomationPageComponent } from './views/user-infomation-page/user-infomation-page.component';
import { ReserveHistoryPageComponent } from './views/reserve-history-page/reserve-history-page.component';
import { ChangePasswordPageComponent } from './views/change-password-page/change-password-page.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      {
        path: 'change-password',
        component: ChangePasswordPageComponent
      },
      {
        path: 'menu',
        component: MenuPageComponent
      },
      {
        path: 'user-infomation',
        component: UserInfomationPageComponent
      },
      {
        path: 'reserse-table-history',
        component: ReserveHistoryPageComponent
      },
      {
        path: 'reserse-table',
        component: ReserveTablePageComponent
      },
      {
        path: 'cart-history',
        component: CartHistoryPageComponent
      },
      {
        path: 'cart',
        component: CartPageComponent
      },
      {
        path: '',
        component: HomePageComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
