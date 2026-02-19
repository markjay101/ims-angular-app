import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { CurrencyPipe } from '@angular/common';
import { InternetPlanService } from '../../../../../core/services/internet-plan-service';
import { InternetPlan } from '../../../../../shared/models/internet-plan';
import { CreateApplicationDto } from '../../../../../shared/models/application';

@Component({
  selector: 'app-application-form',
  imports: [LucideAngularModule, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './application-form.html',
  styleUrl: './application-form.css',
})
export class ApplicationForm implements OnInit {
  ngOnInit(): void {
    this.loadInternetPlans();
  }
  private fb = inject(FormBuilder);
  private internetPlanService = inject(InternetPlanService);

  applicationForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    contactNumber: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    postalCode: ['', Validators.required],
    internetPlanId: ['', Validators.required],
  });

  isPlanLoading = signal<boolean>(false);
  internetPlans = signal<InternetPlan[]>([]);
  selectedInternetPlanId = signal<string | null>(null);

  onSave = output<CreateApplicationDto>();
  isSaving = input<boolean>(false);

  loadInternetPlans() {
    this.isPlanLoading.set(true);
    this.internetPlanService.getInternetPlans().subscribe({
      next: (res) => {
        if (res && res.succeeded) this.internetPlans.set(res.data.items);

        this.isPlanLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isPlanLoading.set(false);
      },
    });
  }

  handleSelectPlan(planId: string) {
    this.applicationForm.get('internetPlanId')?.setValue(planId);
    this.selectedInternetPlanId.set(planId);
  }

  handleSave() {
    if (this.isSaving()) return;

    this.onSave.emit(this.applicationForm.getRawValue());
  }

  resetForm() {
    this.applicationForm.reset();
  }
}
