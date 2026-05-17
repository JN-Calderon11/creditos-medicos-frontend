import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthResponse, loginUser } from '../Interfaces/auth.interface';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { IHttpResponse } from '../../../shared/interfaces/model.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient)

  private readonly baseUrl = environment.apiUrl

  login(user: loginUser): Observable<IHttpResponse<AuthResponse>> {
    const url = `${this.baseUrl}auth/login`;

    return this.http.post<IHttpResponse<AuthResponse>>(url, user).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.saveSession(response.data);
        }
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(err.error?.message ?? 'Error al iniciar sesión'));
      })
    );
  }

  private saveSession(auth: AuthResponse): void {
    localStorage.setItem('token', auth.token);
    localStorage.setItem('username', auth.username);
    localStorage.setItem('fullname', auth.fullname);
  }









}
