import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from '../modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgImageSliderModule } from 'ng-image-slider';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerListPageComponent } from './views/customer-list-page/customer-list-page.component';
import { OrderListPageComponent } from './views/order-list-page/order-list-page.component';
import { EmployeeListPageComponent } from './views/employee-list-page/employee-list-page.component';
import { FoodListPageComponent } from './views/food-list-page/food-list-page.component';
import { AddFoodDialogComponent } from './components/add-food-dialog/add-food-dialog.component';
import { ReversedListPageComponent } from './views/reversed-list-page/reversed-list-page.component';
import { AppovalDialogComponent } from './components/appoval-dialog/appoval-dialog.component';
import { CreateNewEmployeeDialogComponent } from './components/create-new-employee-dialog/create-new-employee-dialog.component';
import { IngredientListPageComponent } from './views/ingredient-list-page/ingredient-list-page.component';
import { CreateDialogComponent } from './components/create-dialog/create-dialog.component';
import { TableListPageComponent } from './views/table-list-page/table-list-page.component';
import { TypePartyListPageComponent } from './views/type-party-list-page/type-party-list-page.component';
import { UserInfomationPageComponent } from './views/user-infomation-page/user-infomation-page.component';
import { ChangePasswordPageComponent } from './views/change-password-page/change-password-page.component';
import { ChartDoughnutComponent } from './components/chart-doughnut/chart-doughnut.component';
import { NgChartsModule } from 'ng2-charts';
import { StatisticPageComponent } from './views/statistic-page/statistic-page.component';
import { ChartLineComponent } from './components/chart-line/chart-line.component';
import { MenuDialogComponent } from './components/menu-dialog/menu-dialog.component';


@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CustomerListPageComponent,
    OrderListPageComponent,
    EmployeeListPageComponent,
    FoodListPageComponent,
    AddFoodDialogComponent,
    ReversedListPageComponent,
    AppovalDialogComponent,
    CreateNewEmployeeDialogComponent,
    IngredientListPageComponent,
    CreateDialogComponent,
    TableListPageComponent,
    TypePartyListPageComponent,
    UserInfomationPageComponent,
    ChangePasswordPageComponent,
    ChartDoughnutComponent,
    StatisticPageComponent,
    ChartLineComponent,
    MenuDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgImageSliderModule,
    NgChartsModule
  ]
})
export class AdminModule { }
