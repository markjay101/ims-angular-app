import { PaginatedList } from './../../shared/models/paginated-list';
import { Component, inject, OnInit, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { PaymentMethodCard } from './components/payment-method-card/payment-method-card';
import { PaymentMethod } from '../../shared/models/payment-method';
import { PaymentMethodForm } from './components/payment-method-form/payment-method-form';
import { PaymentMethodService } from '../../core/services/payment-method-service';
import { CreatePaymentMethodDto } from '../../shared/models/create-payment-method-dto';
import { ApiResponse } from '../../shared/models/api-response';
import { UpdatePaymentMethodDto } from '../../shared/models/update-payment-method-dto';

@Component({
  selector: 'app-payment-methods',
  imports: [LucideAngularModule, PaymentMethodCard, PaymentMethodForm],
  templateUrl: './payment-methods.html',
  styleUrl: './payment-methods.css',
})
export class PaymentMethods implements OnInit {
  ngOnInit(): void {
    this.loadPaymentMethods();
  }

  private paymentMethodService = inject(PaymentMethodService);

  paymentMethods = signal<PaginatedList<PaymentMethod>>({
    items: [],
    totalCount: 0,
    pageNumber: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  isLoading = signal<boolean>(false);

  selectedPaymentMethod = signal<PaymentMethod | null>(null);
  isFormOpen = signal<boolean>(false);
  isSaving = signal<boolean>(false);

  loadPaymentMethods() {
    this.isLoading.set(true);

    this.paymentMethodService.getPaymentMethods().subscribe({
      next: (res) => {
        this.isLoading.set(false);

        if (res && res.succeeded) this.paymentMethods.set(res.data);
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  handleAdd(): void {
    this.isFormOpen.set(true);
    this.selectedPaymentMethod.set(null);
  }

  handleEdit(data: PaymentMethod): void {
    this.isFormOpen.set(true);

    this.selectedPaymentMethod.set(data);
  }

  handleSave(formData: any) {
    this.isSaving.set(true);

    const paymentMethodId = this.selectedPaymentMethod()?.id;

    const request$ = paymentMethodId
      ? this.paymentMethodService.updatePaymentMethod({
          ...formData,
          paymentMethodId: paymentMethodId,
        })
      : this.paymentMethodService.createPaymentMethod(formData);

    request$.subscribe({
      next: (response: ApiResponse<any>) => {
        this.isSaving.set(false);
        this.isFormOpen.set(false);
        this.loadPaymentMethods();

        console.log(response.message);
      },
      error: (err) => {
        this.isSaving.set(false);
        console.error(err);
      },
    });
  }
}
