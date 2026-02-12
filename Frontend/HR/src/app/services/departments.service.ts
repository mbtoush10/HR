import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../interfaces/department-interface';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  apiUrl: string = "https://localhost:44314/api/Department/";
  constructor(private _http: HttpClient) {


  }

  getAll(searchObj: any){

    let params = new HttpParams();
    params = params.set("Name", searchObj.departmentName ?? "");
    params = params.set("FloorNumber", searchObj.floorNumber ?? "");


    return this._http.get(this.apiUrl + "GetAll", {params});
  }

  getDepartmentsList(){

    let params = new HttpParams();
    params = params.set("","");


    return this._http.get(this.apiUrl + "GetDepartmentsList", {params});
  }

  add(department: Department){
 

    return this._http.post(this.apiUrl + "Add", department);
  }

  update(department: Department){

    return this._http.put(this.apiUrl + "Update", department);
  }

  delete(id: number){
  let params = new HttpParams();
    params = params.set("id", id);

    return this._http.delete(this.apiUrl + "Delete", {params});
  }
}
