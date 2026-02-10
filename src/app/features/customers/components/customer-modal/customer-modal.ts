import { Component, model, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Customer } from '../../../../shared/models/customer';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { CustomerStatus } from '../../../../core/constants/customer-status';

@Component({
  selector: 'app-customer-modal',
  imports: [LucideAngularModule, UpperCasePipe, CurrencyPipe],
  templateUrl: './customer-modal.html',
  styleUrl: './customer-modal.css',
})
export class CustomerModal {
  closeModal = output<void>();

  customer = model.required<Customer>();

  protected getStatusClass(status: string): string {
    switch (status as CustomerStatus) {
      case CustomerStatus.Pending:
        return 'bg-[#fffbeb] text-[#d97706] border-[#d97706]';
      case CustomerStatus.Active:
        return 'bg-[#ecfdf5] text-[#047857] border-[#047857]';
      case CustomerStatus.Inactive:
        return 'bg-[#f8fafc] text-[#475577] border-[#475577]';
      default:
        return 'bg-slate-50 text-slate-500 border-slate-200';
    }
  }
}
