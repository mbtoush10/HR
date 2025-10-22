import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  
  apiUrl: string = "https://localhost:44314/api/Employees/";
  constructor(private _http: HttpClient) {

  }

  getAll(){

    let params = new HttpParams();
    params = params.set("PositionId","");
    params = params.set("Name","");
    params = params.set("IsActive","");


    return this._http.get(this.apiUrl + "GetAll", {params});
  }

  getManegars(employeeId?: number){

    let params = new HttpParams();
    params = params.set("employeeId", employeeId ?? ""); // Handle Undefined: employeeId != null ?employeeId : ""


    return this._http.get(this.apiUrl + "GetManagersList", {params});
  }
}
