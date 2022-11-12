
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'src/app/components/dialog-confirm/dialog-confirm.component';


export class DialogConfirmSevice {

  constructor(public dialog: MatDialog) { }
  dialogShow: any;
  result: boolean | any;
  async show(message: String) {
    this.dialogShow = this.dialog.open(DialogConfirmComponent, {
      data: message, disableClose: true
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