import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { ApiResponse } from '@shared/models/api-response';
import { PaginatedList } from '@shared/models/paginated-list';
import { Application, CreateApplicationDto } from '@shared/models/application';
import { ApplicationStatus } from '@constants/application-status';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getApplications(
    pageNumber: Number = 1,
    pageSize: Number = 25,
    searchTerm: string = '',
    status: ApplicationStatus | null = null,
  ) {
    var url = `${this.baseUrl}/applications?pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=${searchTerm}`;

    if (status !== null) url += `&status=${status}`;

    return this.http.get<ApiResponse<PaginatedList<Application>>>(url);
  }

  createpplication(data: CreateApplicationDto) {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/applications/create`, data);
  }

  updateApplicationStatus(id: string, status: number) {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/applications/update-status`, {
      applicationId: id,
      status,
    });
  }

  getApplicationById(id: string) {
    return this.http.get<ApiResponse<Application>>(`${this.baseUrl}/applications/${id}`);
  }
}
