
import { MatDialog } from '@angular/material/dialog';
import { AddFoodDialogComponent } from 'src/app/admin/components/add-food-dialog/add-food-dialog.component';

export class DialogFoodFormAddOrCreateSevice {

  constructor(public dialog: MatDialog) { }
  dialogShow: any;
  show(foodId: Number) {
    this.dialogShow = this.dialog.open(AddFoodDialogComponent, {
      data: foodId,
    });
    return this.dialogShow.afterClosed();
  }

  hide() {
    this.dialogShow?.close();
  }

}