import { PaginatedList } from './../../shared/models/paginated-list';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../../shared/models/api-response';
import {
  CreatePaymentMethodDto,
  PaymentMethod,
  UpdatePaymentMethodDto,
} from '../../shared/models/payment-method';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getPaymentMethods(): Observable<ApiResponse<PaginatedList<PaymentMethod>>> {
    return this.http.get<ApiResponse<PaginatedList<PaymentMethod>>>(
      `${this.baseUrl}/payment-methods`,
    );
  }

  createPaymentMethod(data: CreatePaymentMethodDto) {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/payment-methods/create`, data).pipe(
      tap((res) => {
        if (res.succeeded) console.log(res.message);
      }),
    );
  }

  updatePaymentMethod(data: UpdatePaymentMethodDto) {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/payment-methods/update`, data).pipe(
      tap((res) => {
        if (res.succeeded) console.log(res.message);
      }),
    );
  }
}
