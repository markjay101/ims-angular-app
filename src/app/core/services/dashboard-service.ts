import { MonthlyEarning } from '@shared/models/monthly-earning';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { ApiResponse } from '@shared/models/api-response';
import { DashboardSummary, SuperAdminDashboardSummary } from '@shared/models/dashboard-summary';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getSummary() {
    return this.http.get<ApiResponse<DashboardSummary | SuperAdminDashboardSummary>>(
      `${this.baseUrl}/dashboard`,
    );
  }

  getMonthlyEarnings() {
    return this.http.get<ApiResponse<MonthlyEarning[]>>(
      `${this.baseUrl}/dashboard/monthly-earnings`,
    );
  }
}
