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
import { ITableList } from 'src/app/models/table-list';
import { TableService } from '../../../services/http/table.service';
@Component({
  selector: 'app-table-list-page',
  templateUrl: './table-list-page.component.html',
  styleUrls: ['./table-list-page.component.scss'],
})
export class TableListPageComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  private tableService: TableService;
  public pagination: IPagination;
  private confirmDialog: DialogConfirmSevice;
  private createDialog: DialogCreateSevice;
  private dialog: DialogSevice;
  private loadingPanel: LoadingPanel;
  displayedColumns: string[] = [
    'id',
    'name',
    'number-of-seat',
    'edit',
    'action',
  ];
  public tableList: ITableList | any;
  dataSource = new MatTableDataSource([]);
  public searchText: String | null = null;
  constructor(dialog: MatDialog, private router: Router, http: HttpClient) {
    this.createDialog = new DialogCreateSevice(dialog);
    this.confirmDialog = new DialogConfirmSevice(dialog);
    this.dialog = new DialogSevice(dialog);
    this.loadingPanel = new LoadingPanel(dialog);
    this.tableService = new TableService(http);
    this.pagination = {
      page: 1,
      size: 10,
      field: null,
      is_reverse_sort: null,
    };
  }

  ngAfterViewInit() {}
  ngOnInit(): void {
    this.getTableList();
  }
  getTableList() {
    this.loadingPanel.show();
    this.tableService
      .getListTable(this.pagination, this.searchText)
      .subscribe((tableList: ITableList | any) => {
        this.loadingPanel.hide();
        this.tableList = tableList;
        this.dataSource.data = tableList.rows;
      });
  }
  renderDate(date: String | any) {
    if (date != undefined) {
      let datetime = new Date(date);
      return datetime.toLocaleDateString();
    } else return '';
  }
  async deleteTable(tableId: Number) {
    let isConfirm = await this.confirmDialog.show('confirm_delete');
    isConfirm.subscribe((result: any) => {
      if (result) {
        this.loadingPanel.show();
        this.tableService
          .deteleTable(tableId)
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
    this.getTableList();
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

    this.getTableList();
  }
  async addTable() {
    let isConfirm = await this.createDialog.show('table');
    isConfirm.subscribe((result: any) => {
      this.ngOnInit();
    });
  }
  async updateTable(tableId: Number) {
    let isConfirm = await this.createDialog.show('table', tableId);
    isConfirm.subscribe((result: any) => {
      this.ngOnInit();
    });
  }
  search(input: any) {
    this.searchText = input.value.trim() != '' ? input.value : null;
    this.getTableList();
  }
}
