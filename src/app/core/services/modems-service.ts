import { environment } from './../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateModemDto, Modem } from '../../shared/models/modem';
import { PaginatedList } from '../../shared/models/paginated-list';
import { ApiResponse } from '../../shared/models/api-response';

@Injectable({
  providedIn: 'root',
})
export class ModemsService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getModems(pageNumber: number, pageSize: number, searchTerm: string) {
    return this.http.get<ApiResponse<PaginatedList<Modem>>>(
      `${this.baseUrl}/modems?pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=${searchTerm}`,
    );
  }

  createModem(data: CreateModemDto) {
    return this.http.post<ApiResponse<string>>(`${this.baseUrl}/modems/create`, data);
  }

  updateModem(data: Modem) {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/modems/update`, data);
  }
}
