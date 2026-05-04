import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from 'express';
import { environment } from '../../../../environments/environment';
import { AuthResponse, loginUser } from '../Interfaces/auth.interface';
import { map, Observable, tap } from 'rxjs';
import { IHttpResponse } from '../../../shared/interfaces/model.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private http = inject(HttpClient)



  private readonly baseUrl = environment.apiUrl

  login(user: loginUser): Observable<IHttpResponse<AuthResponse>> {

    const url = `${this.baseUrl}auth/login`
    return this.http.post<IHttpResponse<AuthResponse>>(url, user).pipe(
      map(response => {
        if (!response.success) {
          throw new Error(response.message || 'Login failed');
        }
        return response;
      }),
      tap(response => {
        if (response.data) {
          this.saveSession(response.data);
        }
      })
    );
  }

  private saveSession(auth: AuthResponse): void {

    localStorage.setItem('token', auth.token);
    localStorage.setItem('username', auth.username);
    localStorage.setItem('fullname', auth.fullname);


  }









}
