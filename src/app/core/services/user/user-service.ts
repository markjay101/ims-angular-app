import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../../shared/models/user';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { STORAGE_KEYS } from '../../constants/storage';
import { UserToken } from '../../../shared/models/user-token';
import { ApiResponse } from '../../../shared/models/api-response';
import { PaginatedList } from '../../../shared/models/paginated-list';
import { AdminStats } from '../../../shared/models/admin-stats';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  readonly currentUser = signal<User | null>(this.getUserFromStorage());

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

  private getUserFromStorage(): User | null {
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return savedUser ? JSON.parse(savedUser) : null;
  }

  getAdmins(
    pageNumber: Number = 1,
    pageSize: Number = 25,
    searchTerm: string = '',
  ): Observable<ApiResponse<PaginatedList<User>>> {
    return this.http.get<ApiResponse<PaginatedList<User>>>(
      `${this.baseUrl}/users/admins?pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=${searchTerm}`,
    );
  }

  getAdminStats(): Observable<ApiResponse<AdminStats>> {
    return this.http.get<ApiResponse<AdminStats>>(`${this.baseUrl}/users/admin/stats`);
  }
}
