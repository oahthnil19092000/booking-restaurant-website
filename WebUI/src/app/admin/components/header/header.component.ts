import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogConfirmSevice } from 'src/app/services/loading/dialog_confirm';
import { LoadingPanel } from 'src/app/services/loading/loading-panel'
import { IUser } from '../../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() userInfo: IUser | any;
  @Input() title: any;
  @Input() orderingCount: number | any;
  private confirmDialog: DialogConfirmSevice;
  private loadingPanel: LoadingPanel;
  constructor(dialog: MatDialog, private router: Router) {
    this.confirmDialog = new DialogConfirmSevice(dialog);
    this.loadingPanel = new LoadingPanel(dialog);
  }

  ngOnInit(): void {
  }

  async logout() {
    let isConfirm = await this.confirmDialog.show("confirm_logout");
    isConfirm.subscribe((result: any) => {
      if (result) {
        this.loadingPanel.show();
        this.router.navigate(['/login']);
        this.loadingPanel.hide();
      }
    });

  }

}
