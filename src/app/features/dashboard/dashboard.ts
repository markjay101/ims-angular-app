import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '@services/auth-service';
import { DashboardCard } from './components/dashboard-card/dashboard-card';
import { DashboardService } from '@services/dashboard-service';
import { DashboardSummary, SuperAdminDashboardSummary } from '@shared/models/dashboard-summary';
import { LucideAngularModule } from 'lucide-angular';
import { EarningsChart } from './components/earnings-chart/earnings-chart';

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

  ngOnInit(): void {
    this.loadSummary();
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
}
