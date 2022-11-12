import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from 'src/app/configs/config.service';
import { IMessage } from 'src/app/models/message';
import { ITicket } from 'src/app/models/ticket';
import { ITicketCreate } from 'src/app/models/ticket-create';
import { ITicketOrderdList } from 'src/app/models/ticket-ordered-list';
import { IPagination } from 'src/app/models/pagination';
@Injectable()
export class TicketService {
  constructor(private http: HttpClient) { }
  url = new ConfigService().url + '/api/ticket';

  createTicket(ticket: ITicketCreate) {
    return this.http.post<ITicket | IMessage>(this.url + '/create', ticket);
  }

  getPendingOrderTicketOfCustomer(userId: Number): Observable<ITicket | IMessage | any> {
    return this.http.get<ITicket | IMessage>(
      this.url + '/get-pending-order/' + userId
    );
  }

  getPendingReserveTicketOfCustomer(userId: Number): Observable<ITicket | IMessage | any> {
    return this.http.get<ITicket | IMessage>(
      this.url + '/get-pending-reserve/' + userId
    );
  }

  order(id: Number, ticket: ITicketCreate): Observable<IMessage | any> {
    return this.http.put<ITicket | IMessage>(
      this.url + '/update/' + id,
      ticket
    );
  }

  getOrderedTicket(userId: Number): Observable<IMessage | any> {
    return this.http.get<IMessage | any>(this.url + '/get-ordered/' + userId);
  }

  getReservedTicket(userId: Number): Observable<IMessage | any> {
    return this.http.get<IMessage | any>(this.url + '/get-reserved/' + userId);
  }

  getGetOrderedListForAdmin(
    pagination: IPagination
  ): Observable<IMessage | any> {
    let params = new HttpParams();
    if (pagination.page != null)
      params = params.append('page', pagination.page);
    if (pagination.size != null)
      params = params.append('size', pagination.size);
    if (pagination.field != null)
      params = params.append('field', pagination.field);
    if (pagination.is_reverse_sort != null)
      params = params.append('is_reverse_sort', pagination.is_reverse_sort);
    return this.http.get<IMessage | any>(this.url + '/pagination', {
      params: params,
    });
  }

  getGetReservedListForAdmin(
    pagination: IPagination
  ): Observable<IMessage | any> {
    let params = new HttpParams();
    if (pagination.page != null)
      params = params.append('page', pagination.page);
    if (pagination.size != null)
      params = params.append('size', pagination.size);
    if (pagination.field != null)
      params = params.append('field', pagination.field);
    if (pagination.is_reverse_sort != null)
      params = params.append('is_reverse_sort', pagination.is_reverse_sort);
    return this.http.get<IMessage | any>(this.url + '/pagination-reserve', {
      params: params,
    });
  }

  reserveTable(ticket: any): Observable<IMessage | any> {
    let tiket_id = ticket.id;
    delete ticket.id;
    delete ticket.createdAt;
    delete ticket.updatedAt;
    delete ticket.payment_date;
    return this.http.put<IMessage | any>(
      this.url + '/update/' + tiket_id,
      ticket
    );
  }

  paid(ticketId: Number): Observable<IMessage | any> {
    return this.http.put<IMessage | any>(
      this.url + '/update-payment-date/' + ticketId,
      {}
    );
  }

  getByTicketId(ticketId: Number): Observable<ITicket | IMessage | any> {
    return this.http.get<ITicket | IMessage | any>(
      this.url + '/get/' + ticketId
    );
  }

  delete(ticketId: Number): Observable<IMessage> {
    return this.http.delete<IMessage>(this.url + '/delete/' + ticketId, {});
  }
}
