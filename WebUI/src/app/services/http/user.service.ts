import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IUserLogin } from 'src/app/models/user-login';
import { IUserLoginResponse } from 'src/app/models/user-login-response';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from 'src/app/configs/config.service';
import { IMessage } from 'src/app/models/message';
import { IUserSignUp } from 'src/app/models/user-signup';
import { IUser } from '../../models/user';
import { IPagination } from 'src/app/models/pagination';
import { IUserList } from 'src/app/models/user-list';
@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}
  url = new ConfigService().url + '/api/user';

  login(user: IUserLogin): Observable<IUserLoginResponse | IMessage> {
    return this.http.post<IUserLoginResponse | IMessage>(
      this.url + '/login',
      user
    );
  }

  signup(user: IUserSignUp): Observable<IUserLoginResponse | IMessage> {
    return this.http.post<IUserLoginResponse | IMessage>(
      this.url + '/signup',
      user
    );
  }

  createStaff(user: IUserSignUp): Observable<IUser | IMessage> {
    return this.http.post<IUser | IMessage>(this.url + '/create-staff', user);
  }

  getIdByToken(refreshToken: String): Observable<Number | IMessage> {
    let token = {
      refreshToken: refreshToken,
    };
    return this.http.post<Number | IMessage>(this.url + '/get-id', token);
  }

  getInfo(user_id: Number): Observable<IUser | IMessage> {
    return this.http.get<IUser | IMessage>(this.url + '/detail/' + user_id);
  }
  updateInfo(userData: any): Observable<IMessage> {
    return this.http.put<IMessage>(this.url + '/update_user_info', userData);
  }

  getCustomerList(
    pagination: IPagination,
    searchText: String | null
  ): Observable<IUserList | IMessage> {
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
    return this.http.get<IUserList | IMessage>(this.url + '/customer-list', {
      params: params,
    });
  }
  getEmployeeList(
    pagination: IPagination,
    searchText: String | null
  ): Observable<IUserList | IMessage> {
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
    return this.http.get<IUserList | IMessage>(this.url + '/admin-list', {
      params: params,
    });
  }

  updatePassword(userId: Number, password: String): Observable<IMessage> {
    let userData = {
      id: userId,
      password: password,
    };
    return this.http.put<IMessage>(this.url + '/change-password', userData);
  }

  deleteUser(userId: Number) {
    return this.http.delete<IMessage>(this.url + '/delete/' + userId, {});
  }
}
