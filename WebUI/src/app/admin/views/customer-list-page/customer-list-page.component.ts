import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/http/user.service';
import { IPagination } from '../../../models/pagination';
import { IUserList } from '../../../models/user-list';
import { IMessage } from '../../../models/message';
import { MatTableDataSource } from '@angular/material/table';
import { DialogConfirmSevice } from 'src/app/services/loading/dialog_confirm';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';
import { MatDialog } from '@angular/material/dialog';
import { DialogSevice } from '../../../services/loading/dialog';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-customer-list-page',
  templateUrl: './customer-list-page.component.html',
  styleUrls: ['./customer-list-page.component.scss']
})
export class CustomerListPageComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;
  private userService: UserService;
  public pagination: IPagination;
  private confirmDialog: DialogConfirmSevice;
  private dialog: DialogSevice;
  private loadingPanel: LoadingPanel;
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'birthday', 'action'];
  public customerList: IUserList | any;
  dataSource = new MatTableDataSource([])
  public searchText: String | null = null;
  constructor(dialog: MatDialog, private router: Router, http: HttpClient) {
    this.confirmDialog = new DialogConfirmSevice(dialog);
    this.dialog = new DialogSevice(dialog);
    this.loadingPanel = new LoadingPanel(dialog);
    this.userService = new UserService(http);
    this.pagination = {
      page: 1,
      size: 10,
      field: null,
      is_reverse_sort: null,
    }
  }

  ngAfterViewInit() {
  }
  ngOnInit(): void {
    this.getCustomerList();
  }
  getCustomerList() {
    this.loadingPanel.show();
    this.userService.getCustomerList(this.pagination, this.searchText).subscribe((customerList: IUserList | any) => {
      this.loadingPanel.hide();
      this.customerList = customerList;
      this.dataSource.data = customerList.rows;
    })
  }
  renderDate(date: String | any) {
    if (date != undefined) {
      let datetime = new Date(date);
      return datetime.toLocaleDateString()
    }
    else return '';
  }
  async deleteCustomer(customerId: Number) {
    let isConfirm = await this.confirmDialog.show("confirm_delete");
    isConfirm.subscribe((result: any) => {
      if (result) {
        this.loadingPanel.show();
        this.userService.deleteUser(customerId).subscribe((message: IMessage) => {
          this.loadingPanel.hide();
          this.ngOnInit();
          this.dialog.show(message);
        })
      }
    });
  }
  loadPageData(page: any) {
    this.pagination.page = page?.pageIndex + 1;
    this.getCustomerList();
  }
  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this.pagination.field = sortState.active;
      this.pagination.is_reverse_sort = sortState.direction == 'desc' ? "true" : "false";
    } else {
      this.pagination.field = null;
      this.pagination.is_reverse_sort = null;
    }
    this.getCustomerList();
  }
  search(input: any) {
    this.searchText = input.value.trim() != "" ? input.value : null;
    this.getCustomerList();
  }
}
