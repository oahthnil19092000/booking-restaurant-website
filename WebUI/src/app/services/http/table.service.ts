import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from 'src/app/configs/config.service';
import { IMessage } from 'src/app/models/message';
import { ITable } from 'src/app/models/table';
import { ITableList } from 'src/app/models/table-list';
import { ITableCreate } from 'src/app/models/table-create';
import { IPagination } from 'src/app/models/pagination';
@Injectable()
export class TableService {
  constructor(private http: HttpClient) {}
  url = new ConfigService().url + '/api/table';

  addTable(table: ITableCreate): Observable<IMessage | any> {
    return this.http.post<IMessage>(this.url + '/create', table);
  }

  getTableInfo(table_id: Number): Observable<ITable | IMessage | any> {
    return this.http.get<ITable | IMessage>(this.url + '/detail/' + table_id);
  }
  getListTable(
    pagination: IPagination,
    searchText: String | null
  ): Observable<ITableList | IMessage | any> {
    let params = new HttpParams();
    if (pagination.page != null)
      params = params.append('page', pagination.page);
    if (pagination.size != null)
      params = params.append('size', pagination.size);
    if (pagination.field != null)
      params = params.append('field', pagination.field);
    if (pagination.is_reverse_sort != null)
      params = params.append('is_reverse_sort', pagination.is_reverse_sort);
    if (searchText != null)
      params = params.append('search', <string>searchText);
    return this.http.get<ITableList | IMessage>(this.url + '/pagination', {
      params: params,
    });
  }
  getList(): Observable<ITableList | IMessage | any> {
    let params = new HttpParams();
    params = params.append('page', 1);
    params = params.append('size', 100);
    return this.http.get<ITableList | IMessage>(this.url + '/pagination', {
      params: params,
    });
  }

  updateTable(
    table_id: Number,
    tableUpdate: ITableCreate
  ): Observable<ITable | IMessage | any> {
    return this.http.put<ITable | IMessage>(
      this.url + '/update/' + table_id,
      tableUpdate
    );
  }
  deteleTable(table_id: Number): Observable<IMessage | any> {
    return this.http.delete<IMessage>(this.url + '/delete/' + table_id);
  }
}
