import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingPanelComponent } from './components/loading-panel/loading-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './components/dialog/dialog.component';
import { SignUpViewComponent } from './views/sign-up-view/sign-up-view.component';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
import { FoodInfomationDailogComponent } from './components/food-infomation-dailog/food-infomation-dailog.component';
import { DetailTicketDialogComponent } from './components/detail-ticket-dialog/detail-ticket-dialog.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { FoodDialogComponent } from './components/food-dialog/food-dialog.component';
import { ChartModule } from './modules/chart/chart/chart.module';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoadingPanelComponent,
    LoginViewComponent,
    DialogComponent,
    SignUpViewComponent,
    DialogConfirmComponent,
    FoodInfomationDailogComponent,
    DetailTicketDialogComponent,
    PageNotFoundComponent,
    FoodDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
