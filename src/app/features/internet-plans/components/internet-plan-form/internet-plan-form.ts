import { Component, effect, inject, input, output } from '@angular/core';
import { InternetPlan } from '@shared/models/internet-plan';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-internet-plan-form',
  imports: [ReactiveFormsModule, LucideAngularModule],
  templateUrl: './internet-plan-form.html',
  styleUrl: './internet-plan-form.css',
})
export class InternetPlanForm {
  internetPlan = input<InternetPlan | null>(null);

  private fb = inject(FormBuilder);
  internetPlanForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    speedMbps: [0, [Validators.required, Validators.min(1)]],
    price: [0, [Validators.required, Validators.min(0)]],
  });

  isSaving = input<boolean>(false);

  onCancel = output<void>();
  onSave = output<any>();

  constructor() {
    effect(() => {
      const user = this.internetPlan();

      if (user) this.internetPlanForm.patchValue(user);
      else this.internetPlanForm.reset();
    });
  }

  submit() {
    this.onSave.emit(this.internetPlanForm.getRawValue());
  }
}
