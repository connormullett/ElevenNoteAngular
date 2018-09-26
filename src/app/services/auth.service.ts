import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/RegisterUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from 'src/app/models/Token';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

const Api_Url = "https://kcpelevennote.azurewebsites.net";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, private _router: Router) { }

  register(regUserData: RegisterUser){
    return this._http.post(`${Api_Url}/api/account/register`, regUserData);
  }

  login(loginInfo){
    const str = 
      `grant_type=password&username=${encodeURI(loginInfo.email)}&password=${encodeURI(loginInfo.password)}`;
      return this._http.post(`${Api_Url}/token`, str).subscribe((token: Token) => {
        localStorage.setItem('id_token', token.access_token);
        this._router.navigate(['/']);
      });
  }

  currentUser(): Observable<Object>{
    if(!localStorage.getItem('id_token')){ return new Observable(observer => observer.next(false)); }

    const authHeader = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);

    return this._http.get(`${Api_Url}/api/Account/UserInfo`, {headers: authHeader});
  }
}

//login username: connormullett@gmail.com password: Tester1!
