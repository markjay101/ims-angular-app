import { inject, Injectable } from '@angular/core';
import { User } from '../../shared/models/user';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/api-response';
import { PaginatedList } from '../../shared/models/paginated-list';
import { AdminStats } from '../../shared/models/admin-stats';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

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
