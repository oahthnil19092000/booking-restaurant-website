import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IPagination } from '../../../models/pagination';
import { IMessage } from '../../../models/message';
import { MatTableDataSource } from '@angular/material/table';
import { DialogConfirmSevice } from 'src/app/services/loading/dialog_confirm';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';
import { MatDialog } from '@angular/material/dialog';
import { DialogSevice } from '../../../services/loading/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { DialogCreateSevice } from '../../../services/loading/dialog_create';
import { TypePartyService } from 'src/app/services/http/type-of-party.service';
import { ITypePartyList } from 'src/app/models/type-party-list';

@Component({
  selector: 'app-type-party-list-page',
  templateUrl: './type-party-list-page.component.html',
  styleUrls: ['./type-party-list-page.component.scss'],
})
export class TypePartyListPageComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  private typePartyService: TypePartyService;
  public pagination: IPagination;
  private confirmDialog: DialogConfirmSevice;
  private createDialog: DialogCreateSevice;
  private dialog: DialogSevice;
  private loadingPanel: LoadingPanel;
  displayedColumns: string[] = ['id', 'name', 'edit', 'action'];
  public typePartyList: ITypePartyList | any;
  dataSource = new MatTableDataSource([]);
  public searchText: String | null = null;
  constructor(dialog: MatDialog, private router: Router, http: HttpClient) {
    this.createDialog = new DialogCreateSevice(dialog);
    this.confirmDialog = new DialogConfirmSevice(dialog);
    this.dialog = new DialogSevice(dialog);
    this.loadingPanel = new LoadingPanel(dialog);
    this.typePartyService = new TypePartyService(http);
    this.pagination = {
      page: 1,
      size: 10,
      field: null,
      is_reverse_sort: null,
    };
  }

  ngAfterViewInit() {}
  ngOnInit(): void {
    this.getTypePartyList();
  }
  getTypePartyList() {
    this.loadingPanel.show();
    this.typePartyService
      .getList(this.pagination, this.searchText)
      .subscribe((typePartyList: ITypePartyList | any) => {
        this.loadingPanel.hide();
        this.typePartyList = typePartyList;
        this.dataSource.data = typePartyList.rows;
      });
  }
  renderDate(date: String | any) {
    if (date != undefined) {
      let datetime = new Date(date);
      return datetime.toLocaleDateString();
    } else return '';
  }
  async deleteTypeParty(typePartyId: Number) {
    let isConfirm = await this.confirmDialog.show('confirm_delete');
    isConfirm.subscribe((result: any) => {
      if (result) {
        this.loadingPanel.show();
        this.typePartyService
          .delete(typePartyId)
          .subscribe((message: IMessage) => {
            this.loadingPanel.hide();
            this.ngOnInit();
            this.dialog.show(message);
          });
      }
    });
  }
  loadPageData(page: any) {
    this.pagination.page = page?.pageIndex + 1;
    this.getTypePartyList();
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.pagination.field = sortState.active;
      this.pagination.is_reverse_sort =
        sortState.direction == 'desc' ? 'true' : 'false';
    } else {
      this.pagination.field = null;
      this.pagination.is_reverse_sort = null;
    }

    this.getTypePartyList();
  }
  async addTypeParty() {
    let isConfirm = await this.createDialog.show('type-party');
    isConfirm.subscribe((result: any) => {
      this.ngOnInit();
    });
  }
  async updateTypeParty(typePartyId: Number) {
    let isConfirm = await this.createDialog.show('type-party', typePartyId);
    isConfirm.subscribe((result: any) => {
      this.ngOnInit();
    });
  }

  search(input: any) {
    this.searchText = input.value.trim() != '' ? input.value : null;
    this.getTypePartyList();
  }
}
