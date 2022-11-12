
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'src/app/components/dialog-confirm/dialog-confirm.component';
import { CommentDialogComponent } from '../../customer/components/comment-dialog/comment-dialog.component';


export class DialogCommentSevice {

  constructor(public dialog: MatDialog) { }
  dialogShow: any;
  result: boolean | any;
  async show(billId: Number) {
    this.dialogShow = this.dialog.open(CommentDialogComponent, {
      data: billId
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