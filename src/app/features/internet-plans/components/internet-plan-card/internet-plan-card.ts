import { Component, input, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { InternetPlan } from '@shared/models/internet-plan';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-internet-plan-card',
  imports: [LucideAngularModule, CurrencyPipe],
  templateUrl: './internet-plan-card.html',
  styleUrl: './internet-plan-card.css',
})
export class InternetPlanCard {
  internetPlanData = input.required<InternetPlan>();

  selectedInternetPlan = output<InternetPlan>();

  handleEdit(data: InternetPlan) {
    this.selectedInternetPlan.emit(data);
  }
}
