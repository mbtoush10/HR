import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  apiUrl: string = "https://localhost:44314/api/Department/";
  constructor(private _http: HttpClient) {


  }
  getDepartmentsList(){

    let params = new HttpParams();
    params = params.set("","");


    return this._http.get(this.apiUrl + "GetDepartmentsList", {params});
  }

}
