import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CustomerListPageComponent } from './views/customer-list-page/customer-list-page.component';
import { OrderListPageComponent } from './views/order-list-page/order-list-page.component';
import { EmployeeListPageComponent } from './views/employee-list-page/employee-list-page.component';
import { FoodListPageComponent } from './views/food-list-page/food-list-page.component';
import { ReversedListPageComponent } from './views/reversed-list-page/reversed-list-page.component';
import { IngredientListPageComponent } from './views/ingredient-list-page/ingredient-list-page.component';
import { TableListPageComponent } from './views/table-list-page/table-list-page.component';
import { TypePartyListPageComponent } from './views/type-party-list-page/type-party-list-page.component';
import { UserInfomationPageComponent } from './views/user-infomation-page/user-infomation-page.component';
import { ChangePasswordPageComponent } from './views/change-password-page/change-password-page.component';
import { StatisticPageComponent } from './views/statistic-page/statistic-page.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    // {
    //   path: 'test',
    //   component: AddFoodDialogComponent
    // },
    {
      path: 'statistic',
      component: StatisticPageComponent
    },
    {
      path: 'change-password',
      component: ChangePasswordPageComponent
    },
    {
      path: 'user-infomation',
      component: UserInfomationPageComponent
    },
    {
      path: 'type-party-list',
      component: TypePartyListPageComponent
    },
    {
      path: 'table-list',
      component: TableListPageComponent
    },
    {
      path: 'ingredient-list',
      component: IngredientListPageComponent
    },
    {
      path: 'reserve-list',
      component: ReversedListPageComponent
    },
    {
      path: 'order-list',
      component: OrderListPageComponent
    },
    {
      path: 'food-list',
      component: FoodListPageComponent
    },
    {
      path: 'employee-list',
      component: EmployeeListPageComponent
    },
    {
      path: 'customer-list',
      component: CustomerListPageComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
