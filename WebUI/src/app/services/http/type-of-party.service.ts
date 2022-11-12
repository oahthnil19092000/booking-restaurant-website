import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from 'src/app/configs/config.service';
import { IPagination } from '../../models/pagination';
import { ITypePartyList } from '../../models/type-party-list';
import { IMessage } from 'src/app/models/message';
import { ITypeParty } from 'src/app/models/type-party';
import { ITypePartyCreate } from 'src/app/models/type-party-create';
@Injectable()
export class TypePartyService {
  constructor(private http: HttpClient) {}
  url = new ConfigService().url + '/api/type-of-party';

  getList(
    pagination: IPagination,
    searchText: String | null
  ): Observable<ITypePartyList | IMessage> {
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
    return this.http.get<ITypePartyList | IMessage>(this.url + '/pagination', {
      params: params,
    });
  }

  createTypeParty(typeParty: ITypePartyCreate): Observable<IMessage | any> {
    return this.http.post<IMessage>(this.url + '/create', typeParty);
  }

  updateTypeParty(
    id: Number,
    typeParty: ITypePartyCreate
  ): Observable<ITypeParty | IMessage | any> {
    return this.http.put<ITypeParty | IMessage>(
      this.url + '/update/' + id,
      typeParty
    );
  }
  getTypePartyInfo(
    type_party_id: Number
  ): Observable<ITypeParty | IMessage | any> {
    return this.http.get<ITypeParty | IMessage>(
      this.url + '/detail/' + type_party_id
    );
  }
  delete(typePartyId: Number): Observable<IMessage> {
    return this.http.delete<IMessage>(this.url + '/delete/' + typePartyId, {});
  }
}
