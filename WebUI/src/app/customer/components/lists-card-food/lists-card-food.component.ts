import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogSevice } from 'src/app/services/loading/dialog';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';
import { FoodService } from '../../../services/http/food.service';
import { IPagination } from '../../../models/pagination';
import { IFood } from '../../../models/food';
import { IFoodList } from '../../../models/food-list';
import { IMessage } from 'src/app/models/message';

@Component({
  selector: 'app-lists-card-food',
  templateUrl: './lists-card-food.component.html',
  styleUrls: ['./lists-card-food.component.scss']
})
export class ListsCardFoodComponent implements OnInit {
  protected listFoods: IFoodList | IMessage | any;
  private foodService: FoodService;
  private loadingPanel: LoadingPanel;
  private dialogService: DialogSevice;
  constructor(http: HttpClient, dialog: MatDialog, private router: Router) {
    this.foodService = new FoodService(http);
    this.loadingPanel = new LoadingPanel(dialog);
    this.dialogService = new DialogSevice(dialog);
  }

  ngOnInit(): void {
    this.getFoodList();
  }

  getFoodList() {
    this.loadingPanel.show();
    let pagination: IPagination = {
      size: 8,
      page: 1,
      field: null,
      is_reverse_sort: null
    }
    this.foodService.getList(pagination, null).subscribe((listFoods: IFoodList | IMessage | any) => {
      this.loadingPanel.hide();
      if (listFoods?.rows) {
        this.listFoods = listFoods;
      } else {
        this.dialogService.show(listFoods?.message);
      }
    });
  }
  formatNumber(number: number) {
    return new Intl.NumberFormat('vi', { style: "currency", currency: "VND" }).format(number);
  }
}
