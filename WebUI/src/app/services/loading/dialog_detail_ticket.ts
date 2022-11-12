
import { MatDialog } from '@angular/material/dialog';
import { DetailTicketDialogComponent } from 'src/app/components/detail-ticket-dialog/detail-ticket-dialog.component';

export class DialogFoodDetailSevice {

  constructor(public dialog: MatDialog) { }
  dialogShow: any;
  result: boolean | any;
  async show(ticketId: Number) {
    this.dialogShow = this.dialog.open(DetailTicketDialogComponent, {
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