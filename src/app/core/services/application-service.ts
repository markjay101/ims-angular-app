import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../../shared/models/api-response';
import { PaginatedList } from '../../shared/models/paginated-list';
import { Application, CreateApplicationDto } from '../../shared/models/application';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getApplications() {
    return this.http.get<ApiResponse<PaginatedList<Application>>>(`${this.baseUrl}/applications`);
  }

  createpplication(data: CreateApplicationDto) {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/applications/create`, data);
  }

  updateApplicationStatus(id: string, status: number) {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/applications/update-status`, {
      id,
      status,
    });
  }
}
