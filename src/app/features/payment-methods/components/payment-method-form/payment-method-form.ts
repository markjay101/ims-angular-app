import { LucideAngularModule } from 'lucide-angular';
import { Component, effect, inject, input, output, signal } from '@angular/core';
import { PaymentMethod } from '../../../../shared/models/payment-method';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentMethodString } from '../../../../core/constants/payment-method';

@Component({
  selector: 'app-payment-method-form',
  imports: [ReactiveFormsModule, LucideAngularModule],
  templateUrl: './payment-method-form.html',
  styleUrl: './payment-method-form.css',
})
export class PaymentMethodForm {
  paymentMethodData = input<PaymentMethod | null>(null);

  private fb = inject(FormBuilder);
  paymentMethodForm: FormGroup = this.fb.group({
    methodName: [PaymentMethodString.Gcash, Validators.required],
    accountName: ['', Validators.required],
    accountNumber: ['', Validators.required],
  });

  isMethodMenuOpen = signal<boolean>(false);
  paymentMethodMenu = [
    { value: PaymentMethodString.Gcash, label: 'Gcash' },
    { value: PaymentMethodString.Maya, label: 'Maya' },
    { value: PaymentMethodString.BPI, label: 'BPI' },
    { value: PaymentMethodString.UnionBank, label: 'Union Bank' },
    { value: PaymentMethodString.BDO, label: 'BDO' },
  ];

  isSaving = input<boolean>(false);

  onSave = output<any>();
  onCancel = output<void>();

  constructor() {
    effect(() => {
      const method = this.paymentMethodData();

      if (method) {
        this.paymentMethodForm.patchValue(method);
        this.paymentMethodForm.get('methodName')?.disable();
      } else {
        this.paymentMethodForm.reset({ methodName: PaymentMethodString.Gcash });
        this.paymentMethodForm.get('methodName')?.enable();
      }
    });
  }

  get selectedPaymentMethodLabel(): string {
    const roleValue = this.paymentMethodForm.get('methodName')?.value;
    return this.paymentMethodMenu.find((m) => m.value === roleValue)?.label || 'Select Method';
  }

  get isMethodDisabled(): boolean {
    return this.paymentMethodForm.get('methodName')?.disabled ?? false;
  }

  selectPaymentMethod(method: PaymentMethodString) {
    this.paymentMethodForm.get('methodName')?.setValue(method);
    this.isMethodMenuOpen.set(false);
  }

  submit() {
    this.isSaving.apply(true);
    this.onSave.emit(this.paymentMethodForm.getRawValue());
  }
}
