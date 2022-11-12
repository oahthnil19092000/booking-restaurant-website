
import { MatDialog } from '@angular/material/dialog';
import { AppovalDialogComponent } from '../../admin/components/appoval-dialog/appoval-dialog.component';


export class DialogApprovalDeliverSevice {

  constructor(public dialog: MatDialog) { }
  dialogShow: any;
  result: boolean | any;
  async show(ticketId: Number) {
    this.dialogShow = this.dialog.open(AppovalDialogComponent, {
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