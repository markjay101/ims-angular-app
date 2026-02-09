import { Component, computed, input, output, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { PaymentMethod } from '../../../../shared/models/payment-method';
import {
  PaymentMethodEnum,
  PaymentMethodImageMap,
} from '../../../../core/constants/payment-method';

@Component({
  selector: 'app-payment-method-card',
  imports: [LucideAngularModule],
  templateUrl: './payment-method-card.html',
  styleUrl: './payment-method-card.css',
})
export class PaymentMethodCard {
  paymentMethod = input.required<PaymentMethod>();

  paymentMethodImage = computed(() => {
    const method = this.paymentMethod().methodName as PaymentMethodEnum;
    return PaymentMethodImageMap[method] || '';
  });

  selectedPaymentMethod = output<PaymentMethod>();

  handleEdit(data: PaymentMethod) {
    this.selectedPaymentMethod.emit(data);
  }
}
