import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFood } from 'src/app/models/food';
import { IMainIngredientDetail } from 'src/app/models/main-ingredient-detail';
import { OrderService } from 'src/app/services/http/order.service';
import { TicketService } from 'src/app/services/http/ticket.service';
import { IFoodDetail } from '../../models/food-detail';
import { ITicket } from '../../models/ticket';
import { IOrder } from '../../models/order';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';

@Component({
  selector: 'app-food-dialog',
  templateUrl: './food-dialog.component.html',
  styleUrls: ['./food-dialog.component.scss']
})
export class FoodDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public foodDetail: IFoodDetail, http: HttpClient, dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  formatNumber(number: Number) {
    return new Intl.NumberFormat('vi', { style: "currency", currency: "VND" }).format(number as number);
  }
}
