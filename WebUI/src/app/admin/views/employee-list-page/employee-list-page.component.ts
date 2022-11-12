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
import { DialogCreateStaffSevice } from '../../../services/loading/dialog_create_new_staff';
@Component({
  selector: 'app-employee-list-page',
  templateUrl: './employee-list-page.component.html',
  styleUrls: ['./employee-list-page.component.scss'],
})
export class EmployeeListPageComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  private userService: UserService;
  public pagination: IPagination;
  private confirmDialog: DialogConfirmSevice;
  private createStaffDialog: DialogCreateStaffSevice;
  private dialog: DialogSevice;
  private loadingPanel: LoadingPanel;
  displayedColumns: string[] = [
    'id',
    'name',
    'username',
    'email',
    'birthday',
    'action',
  ];
  public employeeList: IUserList | any;
  dataSource = new MatTableDataSource([]);
  public searchText: String | null = null;
  constructor(dialog: MatDialog, private router: Router, http: HttpClient) {
    this.createStaffDialog = new DialogCreateStaffSevice(dialog);
    this.confirmDialog = new DialogConfirmSevice(dialog);
    this.dialog = new DialogSevice(dialog);
    this.loadingPanel = new LoadingPanel(dialog);
    this.userService = new UserService(http);
    this.pagination = {
      page: 1,
      size: 10,
      field: null,
      is_reverse_sort: null,
    };
  }

  ngAfterViewInit() { }
  ngOnInit(): void {
    this.getEmployeeList();
  }
  getEmployeeList() {
    this.loadingPanel.show();
    this.userService
      .getEmployeeList(this.pagination, this.searchText)
      .subscribe((employeeList: IUserList | any) => {
        this.loadingPanel.hide();
        this.employeeList = employeeList;
        this.dataSource.data = employeeList.rows;
      });
  }
  renderDate(date: String | any) {
    if (date != undefined) {
      let datetime = new Date(date);
      return datetime.toLocaleDateString();
    } else return '';
  }
  async deleteEmployee(employeeId: Number) {
    let isConfirm = await this.confirmDialog.show('confirm_delete');
    isConfirm.subscribe((result: any) => {
      if (result) {
        this.loadingPanel.show();
        this.userService
          .deleteUser(employeeId)
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
    this.getEmployeeList();
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

    this.getEmployeeList();
  }
  async addEmployee() {
    let isConfirm = await this.createStaffDialog.show();
    isConfirm.subscribe((result: any) => {
      this.ngOnInit();
    });
  }

  search(input: any) {
    this.searchText = input.value.trim() != '' ? input.value : null;
    this.getEmployeeList();
  }
}
