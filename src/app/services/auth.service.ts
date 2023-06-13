import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  sendLogin(data:any){
    const url=`${environment.urlBase}/api/auth/login`;
    return this.http.post(url,data);

  }
}
