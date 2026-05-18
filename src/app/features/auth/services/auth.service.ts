import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuthResponse, loginUser } from '../Interfaces/auth.interface';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IHttpResponse } from '../../../shared/interfaces/model.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly baseUrl = environment.apiUrl;

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('fullname');
    }
    this.router.navigateByUrl('/login');
  }

  getUsername(): string | null {
    return this.isBrowser ? localStorage.getItem('username') : null;
  }

  getFullname(): string | null {
    return this.isBrowser ? localStorage.getItem('fullname') : null;
  }

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
    if (!this.isBrowser) return;
    localStorage.setItem('token', auth.token);
    localStorage.setItem('username', auth.username);
    localStorage.setItem('fullname', auth.fullname);
  }
}
