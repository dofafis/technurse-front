import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './login';

const API = 'http://localhost:3333';

@Injectable({ providedIn: 'root' })
export class LoginService {

    constructor(private http: HttpClient) {}

    logarUsuario(loginInfo: Login) {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };

      return this.http
        .post<Login>(API + '/api/auth/register', loginInfo, httpOptions);

    }

}
