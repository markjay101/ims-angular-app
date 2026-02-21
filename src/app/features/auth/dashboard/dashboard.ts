import { MonthlyEarning } from '@shared/models/monthly-earning';
import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '@services/auth-service';
import { DashboardCard } from './components/dashboard-card/dashboard-card';
import { DashboardService } from '@services/dashboard-service';
import { DashboardSummary, SuperAdminDashboardSummary } from '@shared/models/dashboard-summary';
import { LucideAngularModule } from 'lucide-angular';
import { EarningsChart } from './components/earnings-chart/earnings-chart';
import { UserRole } from '@constants/role';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardCard, LucideAngularModule, EarningsChart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private authService = inject(AuthService);
  protected currentUser = this.authService.currentUser;

  private dashboardService = inject(DashboardService);
  dashboardSummary = signal<DashboardSummary | null>(null);
  superAdminDashboardSummary = signal<SuperAdminDashboardSummary | null>(null);
  monthlyEarnings = signal<MonthlyEarning[]>([]);

  ngOnInit(): void {
    this.loadSummary();

    if (this.currentUser()?.role == UserRole.SuperAdmin) this.loadMonthlyEarnigs();
  }
  loadSummary() {
    this.dashboardService.getSummary().subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.dashboardSummary.set(res.data as DashboardSummary);
          this.superAdminDashboardSummary.set(res.data as SuperAdminDashboardSummary);
        }
      },
    });
  }

  loadMonthlyEarnigs() {
    this.dashboardService.getMonthlyEarnings().subscribe({
      next: (res) => {
        if (res.succeeded) this.monthlyEarnings.set(res.data);
        else this.monthlyEarnings.set([]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
