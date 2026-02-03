import { Component, inject, OnInit, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { InternetPlanCard } from './components/internet-plan-card/internet-plan-card';
import { InternetPlanService } from '../../core/services/internet-plan-service';
import { InternetPlan } from '../../shared/models/internet-plan';
import { InternetPlanForm } from './components/internet-plan-form/internet-plan-form';
import { Backdrop } from '../../shared/components/backdrop/backdrop';
import { FormContainer } from '../../shared/components/form-container/form-container';

@Component({
  selector: 'app-internet-plans',
  imports: [LucideAngularModule, InternetPlanCard, InternetPlanForm, Backdrop, FormContainer],
  templateUrl: './internet-plans.html',
  styleUrl: './internet-plans.css',
})
export class InternetPlans implements OnInit {
  private internetPlanService = inject(InternetPlanService);

  internetPlans = signal<InternetPlan[]>([]);
  isLoading = signal<boolean>(false);
  selectedInternetPlan = signal<InternetPlan | null>(null);
  isFormOpen = signal<boolean>(false);
  isSaving = signal<boolean>(false);

  ngOnInit(): void {
    this.loadInternetPlans();
  }

  loadInternetPlans() {
    this.isLoading.set(true);
    this.internetPlanService.getInternetPlans().subscribe({
      next: (res) => {
        if (res && res.succeeded) this.internetPlans.set(res.data.items);

        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      },
    });
  }

  handleAdd() {
    this.isFormOpen.set(true);
    this.selectedInternetPlan.set(null);
  }

  handleEdit(data: InternetPlan) {
    this.isFormOpen.set(true);
    this.selectedInternetPlan.set(data);
  }

  handleSave(formData: any) {
    this.isSaving.set(true);

    const id = this.selectedInternetPlan()?.id;

    const request$ = id
      ? this.internetPlanService.updateInternetPlan({ ...formData, id })
      : this.internetPlanService.createInternetPlan(formData);

    request$.subscribe({
      next: (res) => {
        this.isSaving.set(false);
        this.isFormOpen.set(false);
        this.loadInternetPlans();

        console.log(res.message);
      },
      error: (err) => {
        this.isSaving.set(false);
        console.error(err);
      },
    });
  }
}
