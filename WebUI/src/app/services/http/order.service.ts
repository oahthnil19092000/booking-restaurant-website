import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from "src/app/configs/config.service";
import { IMessage } from 'src/app/models/message';
import { IOrder } from 'src/app/models/order';
import { IOrderList } from 'src/app/models/order-list';
@Injectable()
export class OrderService {
  constructor(private http: HttpClient) { }
  url = new ConfigService().url + '/api/order';

  order(order: IOrder): Observable<IMessage | any> {
    return this.http.post<IMessage>(this.url + '/create', order);
  }

  getListWithTicketId(ticket_id: Number): Observable<IOrderList> {
    return this.http.get<any>(this.url + '/get-order/' + ticket_id);
  }

  getOrderWithTicketAndFodd(ticket_id: Number, food_id: Number): Observable<IOrder | any> {
    let params = new HttpParams();
    params = params.append("ticket_id", <number>ticket_id);
    params = params.append("food_id", <number>food_id);
    return this.http.get<IOrder>(this.url + '/get-order-deteail/', { params: params });
  }
  updateOrder(order_id: Number, quantity: Number, ticket_id: Number, food_id: Number) {
    let orderUpdate = {
      ticket_id: ticket_id,
      food_id: food_id,
      quantity: quantity
    }
    return this.http.put<IMessage>(this.url + '/update/' + order_id, orderUpdate);
  }
  deteleFoodNotOrder(order_id: Number): Observable<IMessage | any> {
    return this.http.delete<IMessage>(this.url + '/delete/' + order_id);
  }

}

