import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../../shared/models/api-response';
import { Customer } from '../../shared/models/customer';
import { PaginatedList } from '../../shared/models/paginated-list';
import { CustomerStatus } from '../constants/customer-status';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getCustomers(
    pageNumber: Number = 1,
    pageSize: Number = 25,
    searchTerm: string = '',
    status: CustomerStatus | null = null,
  ) {
    var url = `${this.baseUrl}/customers?pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=${searchTerm}`;

    if (status !== null) url += `&status=${status}`;

    return this.http.get<ApiResponse<PaginatedList<Customer>>>(url);
  }
}
