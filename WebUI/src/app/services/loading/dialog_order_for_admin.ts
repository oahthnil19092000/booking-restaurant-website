
import { MatDialog } from '@angular/material/dialog';
import { MenuDialogComponent } from '../../admin/components/menu-dialog/menu-dialog.component';


export class DialogOrderForAdminSevice {

  constructor(public dialog: MatDialog) { }
  dialogShow: any;
  result: boolean | any;
  async show(ticketId: Number) {
    this.dialogShow = this.dialog.open(MenuDialogComponent, {
      data: ticketId
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