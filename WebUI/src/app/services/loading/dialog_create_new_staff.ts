
import { MatDialog } from '@angular/material/dialog';
import { AppovalDialogComponent } from '../../admin/components/appoval-dialog/appoval-dialog.component';
import { CreateNewEmployeeDialogComponent } from '../../admin/components/create-new-employee-dialog/create-new-employee-dialog.component';


export class DialogCreateStaffSevice {

  constructor(public dialog: MatDialog) { }
  dialogShow: any;
  result: boolean | any;
  async show() {
    this.dialogShow = this.dialog.open(CreateNewEmployeeDialogComponent);
    return this.dialogShow.afterClosed();
  }

  async getResult() {
    return this.dialogShow.afterClosed();
  }
  hide() {
    this.dialogShow?.close();
  }

}