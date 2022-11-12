import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from "src/app/configs/config.service";

@Injectable()
export class PublicFileService {
  constructor(private http: HttpClient) { }
  url = new ConfigService().url;

  getCitiesList(): Observable<any> {
    return this.http.get<any>(this.url + '/addresses/cities.json')
  }

  getDistrictsList(cityCode: Number): Observable<any> {
    return this.http.get<any>(this.url + `/addresses/districts/${cityCode}.json`)
  }

  getWardsList(districtCode: Number): Observable<any> {
    return this.http.get<any>(this.url + `/addresses/wards/${districtCode}.json`)
  }
}

