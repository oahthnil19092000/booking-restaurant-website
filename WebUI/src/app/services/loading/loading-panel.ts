
import {MatDialog} from '@angular/material/dialog';
import { LoadingPanelComponent } from 'src/app/components/loading-panel/loading-panel.component';

export class LoadingPanel {

  constructor(public dialog: MatDialog) {}
  dialogLoadingPanel : any;
  show() {
    this.dialogLoadingPanel =this.dialog.open(LoadingPanelComponent, { disableClose: true });
  }

  hide(){
    this.dialogLoadingPanel?.close();
  }

}