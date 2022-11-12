import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from 'src/app/configs/config.service';
import { IMessage } from 'src/app/models/message';
import { IPagination } from '../../models/pagination';
import { IFoodList } from '../../models/food-list';
import { IFood } from 'src/app/models/food';
import { IFoodCreate } from 'src/app/models/food-create';
import { IRasaRequest } from 'src/app/models/rasa-request';
import { IRasaResponse } from 'src/app/models/rasa-response';
@Injectable()
export class RasaService {
  constructor(private http: HttpClient) {}
  url = new ConfigService().rasa_url + '/webhooks/rest/webhook';

  chat(message: String): Observable<IRasaResponse[]> {
    let messageRequest: IRasaRequest = {
      sender: 'me',
      message: message,
    };
    return this.http.post<IRasaResponse[]>(this.url, messageRequest);
  }
}
