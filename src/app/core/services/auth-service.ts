import { inject, Injectable, signal } from '@angular/core';
import { ApiResponse } from '@shared/models/api-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment.development';
import { BehaviorSubject, catchError, filter, map, Observable, take, tap, throwError } from 'rxjs';
import { STORAGE_KEYS } from '@constants/storage';
import { User, UserToken } from '@shared/models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  private router = inject(Router);

  readonly currentUser = signal<User | null>(this.getUserFromStorage());

  // Locking mechanism for concurrent 401s
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  private getUserFromStorage(): User | null {
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return savedUser ? JSON.parse(savedUser) : null;
  }

  login(credentials: { username: string; password: string }): Observable<ApiResponse<UserToken>> {
    return this.http
      .post<
        ApiResponse<UserToken>
      >(`${this.baseUrl}/auth/sign-in`, credentials, { withCredentials: true })
      .pipe(
        tap((res) => {
          if (res.succeeded && res.data?.token) {
            localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, res.data.token);
            localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(res.data.user));
            this.currentUser.set(res.data.user);
          }
        }),
      );
  }

  refreshToken(): Observable<ApiResponse<string>> {
    if (this.isRefreshing) {
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        map((token) => ({ succeeded: true, data: token! }) as ApiResponse<string>),
      );
    }

    this.isRefreshing = true;
    this.refreshTokenSubject.next(null);

    return this.http
      .post<
        ApiResponse<string>
      >(`${this.baseUrl}/auth/refresh-token`, {}, { withCredentials: true })
      .pipe(
        tap((res) => {
          if (res.succeeded && res.data) {
            localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, res.data);
            this.refreshTokenSubject.next(res.data);
          }
          this.isRefreshing = false;
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(null);
          return throwError(() => err);
        }),
      );
  }

  logout() {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }
}
