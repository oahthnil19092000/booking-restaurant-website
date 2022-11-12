
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from 'src/app/admin/components/create-dialog/create-dialog.component';


export class DialogCreateSevice {

  constructor(public dialog: MatDialog) { }
  dialogShow: any;
  result: boolean | any;
  async show(type: "ingredient" | "table" | "type-party", id: Number = 0) {
    this.dialogShow = this.dialog.open(CreateDialogComponent, {
      data: {
        for: type,
        id: id
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