import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from 'src/app/configs/config.service';
import { IMessage } from 'src/app/models/message';
import { IPagination } from '../../models/pagination';
import { IFoodList } from '../../models/food-list';
import { IFood } from 'src/app/models/food';
import { IFoodCreate } from 'src/app/models/food-create';
@Injectable()
export class FoodService {
  constructor(private http: HttpClient) {}
  url = new ConfigService().url + '/api/food';

  getList(
    pagination: IPagination,
    searchText: String | null
  ): Observable<IFoodList | IMessage> {
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
    return this.http.get<IFoodList | IMessage>(this.url + '/pagination', {
      params: params,
    });
  }

  createFood(food: IFoodCreate) {
    return this.http.post<IFood | IMessage>(this.url + '/create', food);
  }

  updateFood(id: Number, food: IFoodCreate) {
    return this.http.put<IFood | IMessage>(this.url + '/update/' + id, food);
  }

  getFoodWithMainIngredientId(
    main_ingredient_id: Number
  ): Observable<IFood[] | IMessage> {
    return this.http.get<IFood[] | IMessage>(
      this.url + '/list/' + main_ingredient_id
    );
  }

  getById(id: Number): Observable<IFood | IMessage> {
    return this.http.get<IFood | IMessage>(this.url + '/detail/' + id);
  }

  delete(foodId: Number): Observable<IMessage> {
    return this.http.delete<IMessage>(this.url + '/delete/' + foodId, {});
  }

  getTheLeastDeliciousFood(): Observable<IFood | IMessage> {
    return this.http.get<IFood | IMessage>(
      this.url + '/get-the-least-delicious'
    );
  }

  getTheMostDeliciousFood(): Observable<IFood | IMessage> {
    return this.http.get<IFood | IMessage>(
      this.url + '/get-the-most-delicious'
    );
  }

  getTheLeastExpensiveFood(): Observable<IFood | IMessage> {
    return this.http.get<IFood | IMessage>(
      this.url + '/get-the-least-expensive'
    );
  }

  getTheMostExpensiveFood(): Observable<IFood | IMessage> {
    return this.http.get<IFood | IMessage>(
      this.url + '/get-the-most-expensive'
    );
  }

  getIdPriceWithFood(search: String): Observable<IFood | Number | any> {
    return this.http.post<IFood | Number>(this.url + '/get-price', {
      search: search,
    });
  }
}
