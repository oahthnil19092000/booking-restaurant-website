
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { IMessage } from 'src/app/models/message';

export class DialogSevice {

  constructor(public dialog: MatDialog) { }
  dialogShow: any;
  show(message: IMessage) {
    this.dialogShow = this.dialog.open(DialogComponent, {
      data: message,
    });
    return this.dialogShow.afterClosed();
  }

  hide() {
    this.dialogShow?.close();
  }

}