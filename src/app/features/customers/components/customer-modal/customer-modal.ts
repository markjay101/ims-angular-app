import { CustomersService } from '@services/customers-service';
import { Component, inject, model, OnInit, output, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Customer } from '@shared/models/customer';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { CustomerStatus } from '@constants/customer-status';
import { DropdownSelect } from '@shared/components/dropdown-select/dropdown-select';
import { ModemsService } from '@services/modems-service';
import { Modem } from '@shared/models/modem';
import { EMPTY_PAGINATED_LIST } from '@root/app/shared/models/paginated-list';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { ToastService } from '@services/toast-service';

@Component({
  selector: 'app-customer-modal',
  imports: [LucideAngularModule, UpperCasePipe, CurrencyPipe, DropdownSelect],
  templateUrl: './customer-modal.html',
  styleUrl: './customer-modal.css',
})
export class CustomerModal implements OnInit {
  private toast = inject(ToastService);
  private customersService = inject(CustomersService);
  private modemsService = inject(ModemsService);
  private modemSearchSubject = new Subject<string>();
  searchTerm = signal<string>('');

  modems = signal<Modem[]>([]);
  isModemsLoading = signal<boolean>(false);
  selectedModem = signal<Modem | null>(null);

  disabledModemSelect = signal<boolean>(false);

  closeModal = output<void>();
  customer = model.required<Customer>();

  ngOnInit(): void {
    this.loadModems();

    this.selectedModem.set(this.customer().modem);

    this.modemSearchSubject
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.searchTerm.set(searchTerm);
        this.loadModems();
      });
  }

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

  loadModems() {
    this.isModemsLoading.set(true);
    this.modemsService.getAvailableModems(this.customer().modem?.id, this.searchTerm()).subscribe({
      next: (res) => {
        if (res && res.succeeded) this.modems.set(res.data);
        else this.modems.set([]);

        this.isModemsLoading.set(false);
      },
      error: (err) => {
        console.error(err);

        this.isModemsLoading.set(false);
      },
    });
  }
  handleModemSearch(searchTerm: string) {
    this.modemSearchSubject.next(searchTerm);
  }

  handleModemSelect(item: Modem) {
    this.disabledModemSelect.set(true);
    this.customersService
      .assignCustomerModem({ customerId: this.customer().id, modemId: item.id })
      .subscribe({
        next: (res) => {
          this.disabledModemSelect.set(false);

          if (res.succeeded) {
            this.customer().modem = item;
            this.customer().status = res.data.status;
            this.selectedModem.set(item);
            this.toast.show('Modem successfully assigned.', 'success');
          }
        },
        error: (err) => {
          this.disabledModemSelect.set(false);
          this.toast.show(err, 'error');
        },
      });
  }
}
