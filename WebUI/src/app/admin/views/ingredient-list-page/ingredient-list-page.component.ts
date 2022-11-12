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
import { IMainIngredientList } from '../../../models/main-ingredient-list';
import { MainIngredientService } from '../../../services/http/main-ingredient.service';
import { IMainIngredient } from '../../../models/main-ingredient';
import { DialogCreateSevice } from '../../../services/loading/dialog_create';

@Component({
  selector: 'app-ingredient-list-page',
  templateUrl: './ingredient-list-page.component.html',
  styleUrls: ['./ingredient-list-page.component.scss'],
})
export class IngredientListPageComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  private mainIngredientService: MainIngredientService;
  public pagination: IPagination;
  private confirmDialog: DialogConfirmSevice;
  private createDialog: DialogCreateSevice;
  private dialog: DialogSevice;
  private loadingPanel: LoadingPanel;
  displayedColumns: string[] = ['id', 'name', 'edit', 'action'];
  public ingredientList: IMainIngredientList | any;
  dataSource = new MatTableDataSource([]);
  public searchText: String | null = null;
  constructor(dialog: MatDialog, private router: Router, http: HttpClient) {
    this.createDialog = new DialogCreateSevice(dialog);
    this.confirmDialog = new DialogConfirmSevice(dialog);
    this.dialog = new DialogSevice(dialog);
    this.loadingPanel = new LoadingPanel(dialog);
    this.mainIngredientService = new MainIngredientService(http);
    this.pagination = {
      page: 1,
      size: 10,
      field: null,
      is_reverse_sort: null,
    };
  }

  ngAfterViewInit() {}
  ngOnInit(): void {
    this.getIngredientList();
  }
  getIngredientList() {
    this.loadingPanel.show();
    this.mainIngredientService
      .getList(this.pagination, this.searchText)
      .subscribe((ingredientList: IMainIngredient | any) => {
        this.loadingPanel.hide();
        this.ingredientList = ingredientList;
        this.dataSource.data = ingredientList.rows;
      });
  }
  renderDate(date: String | any) {
    if (date != undefined) {
      let datetime = new Date(date);
      return datetime.toLocaleDateString();
    } else return '';
  }
  async deleteIngredient(ingredientId: Number) {
    let isConfirm = await this.confirmDialog.show('confirm_delete');
    isConfirm.subscribe((result: any) => {
      if (result) {
        this.loadingPanel.show();
        this.mainIngredientService
          .deteleMainIngredient(ingredientId)
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
    this.getIngredientList();
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

    this.getIngredientList();
  }
  async addIngredient() {
    let isConfirm = await this.createDialog.show('ingredient');
    isConfirm.subscribe((result: any) => {
      this.ngOnInit();
    });
  }
  async updateIngredient(ingredientId: Number) {
    let isConfirm = await this.createDialog.show('ingredient', ingredientId);
    isConfirm.subscribe((result: any) => {
      this.ngOnInit();
    });
  }

  search(input: any) {
    this.searchText = input.value.trim() != '' ? input.value : null;
    this.getIngredientList();
  }
}
