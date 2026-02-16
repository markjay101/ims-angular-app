import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-dashboard-card',
  imports: [LucideAngularModule],
  templateUrl: './dashboard-card.html',
  styleUrl: './dashboard-card.css',
})
export class DashboardCard {
  header = input.required<string>();
  subHeader = input.required<string>();
  value = input.required<string>();

  iconName = input.required<string>();
  iconColorClass = input.required<string>();
}
