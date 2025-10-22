import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LookupsService {
  apiUrl: string = "https://localhost:44314/api/LookUps/";
  constructor(private _http: HttpClient) {

  }

  getByMajorCode(majorCode: number){

    let params = new HttpParams();
    params = params.set("MajorCode",majorCode);


    return this._http.get(this.apiUrl + "GetByMajorCode", {params});
  }
}
