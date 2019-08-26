import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = 'http://localhost:3333';

@Injectable({ providedIn: 'root' })
export class HomeService {

    constructor(private http: HttpClient) {}

    getUsuario(token) {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
      };

      return this.http
        .post<any>(API + '/api/auth/user', httpOptions);

    }

}
