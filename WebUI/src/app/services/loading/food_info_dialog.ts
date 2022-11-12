
import { MatDialog } from '@angular/material/dialog';
import { FoodInfomationDailogComponent } from '../../components/food-infomation-dailog/food-infomation-dailog.component';
import { IFood } from '../../models/food';
import { IMainIngredientDetail } from '../../models/main-ingredient-detail';
import { FoodDialogComponent } from '../../components/food-dialog/food-dialog.component';


export class FoodInfoDialogSevice {

  constructor(public dialog: MatDialog) { }
  dialogShow: any;
  result: boolean | any;
  async show(food: IFood, mainIngredientDetail: IMainIngredientDetail[]) {
    this.dialogShow = this.dialog.open(FoodDialogComponent, {
      data: {
        food: food,
        mainIngredientDetail: mainIngredientDetail,
        userId: 0
      }
    });
    return this.dialogShow.afterClosed();
  }

  async getResult() {
    return this.dialogShow.afterClosed();
  }
  hide() {
    this.dialogShow?.close();
  }

}