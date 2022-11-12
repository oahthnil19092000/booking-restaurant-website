import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from 'src/app/configs/config.service';
import { IMessage } from 'src/app/models/message';
import { IDiscountCreate } from '../../models/discount-create';
import { IDiscount } from '../../models/discount';
import { IPagination } from 'src/app/models/pagination';
import { IDiscountList } from 'src/app/models/discount-list';
@Injectable()
export class DiscountService {
  constructor(private http: HttpClient) { }
  url = new ConfigService().url + '/api/discount';

  createNewDiscount(discount: IDiscountCreate): Observable<IMessage | any> {
    return this.http.post<IMessage>(this.url + '/create/', discount);
  }

  getById(discountId: Number): Observable<IDiscount | IMessage | any> {
    return this.http.get<IDiscount | IMessage>(this.url + '/get/' + discountId);
  }

  getAll(pagination: IPagination): Observable<IDiscountList | IMessage | any> {
    let params = new HttpParams();
    if (pagination.page != null)
      params = params.append("page", pagination.page);
    if (pagination.size != null)
      params = params.append("size", pagination.size);
    if (pagination.field != null)
      params = params.append("field", pagination.field);
    if (pagination.is_reverse_sort != null)
      params = params.append("is_reverse_sort", pagination.is_reverse_sort);
    return this.http.get<IDiscount | IMessage>(this.url + '/pagination/', { params: params });
  }

  updateComment(id: Number, discount: IDiscountCreate): Observable<IDiscount | IMessage | any> {
    return this.http.put<IDiscount | IMessage>(
      this.url + '/update/' + id,
      discount
    );
  }
  deteleComment(discount_id: Number): Observable<IMessage | any> {
    return this.http.delete<IMessage>(this.url + '/delete/' + discount_id);
  }
}
