import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

const MOCK_EMAIL = 'admin@dawa.com';
const MOCK_PASSWORD = 'admin123';
const TOKEN_KEY = 'auth_token';
const TOKEN_VALUE = 'mock-token';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  signIn(email: string, password: string): Observable<boolean> {
    if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
      localStorage.setItem(TOKEN_KEY, TOKEN_VALUE);
      return of(true).pipe(delay(400));
    }
    return throwError(() => new Error('Credenciales inválidas')).pipe(delay(400));
  }

  signOut(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    if (typeof localStorage === 'undefined') return false;
    return localStorage.getItem(TOKEN_KEY) === TOKEN_VALUE;
  }
}
