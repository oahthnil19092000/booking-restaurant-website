
import { MatDialog } from '@angular/material/dialog';
import { FoodInfomationDailogComponent } from '../../components/food-infomation-dailog/food-infomation-dailog.component';
import { IFood } from '../../models/food';
import { IMainIngredientDetail } from '../../models/main-ingredient-detail';
import { IUser } from '../../models/user';


export class FoodDialogSevice {

  constructor(public dialog: MatDialog) { }
  dialogShow: any;
  result: boolean | any;
  async show(food: IFood, mainIngredientDetail: IMainIngredientDetail[], UserID: Number) {
    this.dialogShow = this.dialog.open(FoodInfomationDailogComponent, {
      data: {
        food: food,
        mainIngredientDetail: mainIngredientDetail,
        userId: UserID
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