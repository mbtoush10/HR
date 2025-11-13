import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employee-interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  
  apiUrl: string = "https://localhost:44314/api/Employees/";
  constructor(private _http: HttpClient) {

  }

  getAll(searchObj: any){

    let params = new HttpParams();
    params = params.set("PositionId", searchObj.positionId ?? "");
    params = params.set("Name", searchObj.name ?? "");
    params = params.set("IsActive",searchObj.status ?? "" );


    return this._http.get(this.apiUrl + "GetAll", {params});
  }

  getManegars(employeeId?: number){

    let params = new HttpParams();
    params = params.set("employeeId", employeeId ?? ""); // Handle Undefined: employeeId != null ?employeeId : ""


    return this._http.get(this.apiUrl + "GetManagersList", {params});
  }

  add(employee: Employee){
    return this._http.post(this.apiUrl + "Add", employee);
  }

  update(employee: Employee){
    return this._http.put(this.apiUrl + "Update", employee);
  }
  delete(id: number){

    let params = new HttpParams();
    params = params.set("id", id);

    return this._http.delete(this.apiUrl + "Delete", {params});
  }

}
