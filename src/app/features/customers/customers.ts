import { Component, inject, OnInit, signal } from '@angular/core';
import { Table } from '../../shared/components/table/table';
import { EMPTY_PAGINATED_LIST, PaginatedList } from '../../shared/models/paginated-list';
import { Customer } from '../../shared/models/customer';
import { CustomersService } from '../../core/services/customers-service';
import { UpperCasePipe } from '@angular/common';
import { CustomerStatus } from '../../core/constants/customer-status';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-customers',
  imports: [Table, UpperCasePipe, LucideAngularModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers implements OnInit {
  handleView(_t21: any) {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.loadCustomers(this.currentPage, this.pageSize, this.searchTerm);
  }
  private customersService = inject(CustomersService);

  paginatedCustomers = signal<PaginatedList<Customer>>(EMPTY_PAGINATED_LIST);

  customerColumns = [
    { key: 'customer', label: 'customer' },
    { key: 'contact', label: 'Contact' },
    { key: 'status', label: 'Status' },
    { key: 'plan', label: 'Internet Plan' },
    { key: 'modem', label: 'Modem' },
    { key: 'actions', label: 'Actions' },
  ];

  protected statusOptions = Object.values(CustomerStatus);
  selectedStatus = signal<CustomerStatus | null>(CustomerStatus.Pending);
  currentPage = 1;
  pageSize = 25;
  searchTerm = '';

  isLoading = signal<boolean>(false);

  loadCustomers(pageNumber: number, pageSize: number, searchTerm: string) {
    this.isLoading.set(true);
    this.customersService.getCustomers(pageNumber, pageSize, searchTerm).subscribe({
      next: (res) => {
        if (res && res.succeeded) this.paginatedCustomers.set(res.data);

        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      },
    });
  }

  handleChangeStatus(status: CustomerStatus | null) {
    this.selectedStatus.set(status);
  }

  protected getStatusClass(status: CustomerStatus): string {
    switch (status) {
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
