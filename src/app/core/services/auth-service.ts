import { inject, Injectable, signal } from '@angular/core';
import { ApiResponse } from '../../shared/models/api-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { UserToken } from '../../shared/models/user-token';
import { Observable, tap } from 'rxjs';
import { STORAGE_KEYS } from '../constants/storage';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  readonly currentUser = signal<User | null>(this.getUserFromStorage());

  private getUserFromStorage(): User | null {
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return savedUser ? JSON.parse(savedUser) : null;
  }

  login(credentials: { username: string; password: string }): Observable<ApiResponse<UserToken>> {
    return this.http
      .post<ApiResponse<UserToken>>(`${this.baseUrl}/users/sign-in`, credentials)
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

  logout() {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    this.currentUser.set(null);
  }

  isAuthenticated() {
    return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }
}
