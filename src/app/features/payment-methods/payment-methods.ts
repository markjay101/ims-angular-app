import { Component, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { PaymentMethodCard } from './components/payment-method-card/payment-method-card';
import { PaymentMethodString } from '../../core/constants/payment-method';
import { PaymentMethod } from '../../shared/models/payment-method';
import { PaymentMethodForm } from './components/payment-method-form/payment-method-form';

@Component({
  selector: 'app-payment-methods',
  imports: [LucideAngularModule, PaymentMethodCard, PaymentMethodForm],
  templateUrl: './payment-methods.html',
  styleUrl: './payment-methods.css',
})
export class PaymentMethods {
  paymentMethods = signal<PaymentMethod[]>([
    {
      id: 'pm-01',
      methodName: PaymentMethodString.Gcash,
      accountName: 'JUAN DELA CRUZ',
      accountNumber: '09123456789',
    },
    {
      id: 'pm-02',
      methodName: PaymentMethodString.Maya,
      accountName: 'MARIA CLARA',
      accountNumber: '09987654321',
    },
    {
      id: 'pm-03',
      methodName: PaymentMethodString.BPI,
      accountName: 'SANTOS SAVINGS',
      accountNumber: '1234-5678-90',
    },
    {
      id: 'pm-04',
      methodName: PaymentMethodString.UnionBank,
      accountName: 'TECH CORP INC',
      accountNumber: '109922883344',
    },
    {
      id: 'pm-05',
      methodName: PaymentMethodString.BDO,
      accountName: 'REYES LOGISTICS',
      accountNumber: '001230456078',
    },
  ]);

  selectedPaymentMethod = signal<PaymentMethod | null>(null);
  isFormOpen = signal<boolean>(false);

  handleAdd(): void {
    this.isFormOpen.set(true);
    this.selectedPaymentMethod.set(null);
  }

  handleEdit(data: PaymentMethod): void {
    this.isFormOpen.set(true);

    this.selectedPaymentMethod.set(data);
  }
}
