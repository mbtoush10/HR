import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = "https://localhost:44314/api/Auth/";
  constructor(private _http: HttpClient) {

  }

  login(loginForm: any){

    return this._http.post(this.apiUrl + "login", loginForm);
  }
  
}
