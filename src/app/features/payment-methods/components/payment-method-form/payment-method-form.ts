import { LucideAngularModule } from 'lucide-angular';
import { Component, effect, inject, input, output, signal } from '@angular/core';
import { PaymentMethod } from '@shared/models/payment-method';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentMethodEnum, PaymentMethodNumberMap } from '@constants/payment-method';

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
    methodName: [PaymentMethodEnum.Gcash, Validators.required],
    accountName: ['', Validators.required],
    accountNumber: ['', Validators.required],
  });

  protected selectedPaymentMethod = signal<PaymentMethodEnum>(PaymentMethodEnum.Gcash);
  protected isMethodOptionsOpen = signal<boolean>(false);
  protected paymentMethodOptions = Object.values(PaymentMethodEnum);

  isSaving = input<boolean>(false);

  onSave = output<any>();
  onCancel = output<void>();

  constructor() {
    effect(() => {
      const method = this.paymentMethodData();

      if (method) {
        this.selectPaymentMethod(method.methodName as PaymentMethodEnum);
        this.paymentMethodForm.patchValue(method);
        this.paymentMethodForm.get('methodName')?.disable();
      } else {
        this.paymentMethodForm.reset({ methodName: PaymentMethodEnum.Gcash });
        this.paymentMethodForm.get('methodName')?.enable();
      }
    });
  }

  get isMethodDisabled(): boolean {
    return this.paymentMethodForm.get('methodName')?.disabled ?? false;
  }

  selectPaymentMethod(method: PaymentMethodEnum) {
    this.paymentMethodForm.get('methodName')?.setValue(method);
    this.selectedPaymentMethod.set(method);
    this.isMethodOptionsOpen.set(false);
  }

  submit() {
    if (this.isSaving()) return;

    const data = this.paymentMethodForm.getRawValue() as PaymentMethod;
    this.onSave.emit({
      ...data,
      methodName: PaymentMethodNumberMap[data.methodName as PaymentMethodEnum],
    });
  }
}
