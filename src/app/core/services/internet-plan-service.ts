import { PaginatedList } from './../../shared/models/paginated-list';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../../shared/models/api-response';
import { InternetPlan } from '../../shared/models/internet-plan';
import { CreateInternetPlanDto } from '../../shared/models/create-internet-plan-dto';

@Injectable({
  providedIn: 'root',
})
export class InternetPlanService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getInternetPlans() {
    return this.http.get<ApiResponse<PaginatedList<InternetPlan>>>(
      `${this.baseUrl}/internet-plans`,
    );
  }

  createInternetPlan(data: CreateInternetPlanDto) {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/internet-plans/create`, data);
  }

  updateInternetPlan(data: InternetPlan) {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/internet-plans/update`, data);
  }
}
