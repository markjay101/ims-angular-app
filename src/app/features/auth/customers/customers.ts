import { Component, inject, OnInit, signal } from '@angular/core';
import { Table } from '@shared/components/table/table';
import {
  Customer,
  CustomersListWithStatusCounts,
  EMPTY_PAGINATED_CUSTOMER_LIST,
} from '@shared/models/customer';
import { CustomersService } from '@services/customers-service';
import { UpperCasePipe } from '@angular/common';
import { CustomerStatus } from '@constants/customer-status';
import { LucideAngularModule } from 'lucide-angular';
import { CustomerModal } from './components/customer-modal/customer-modal';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-customers',
  imports: [Table, UpperCasePipe, LucideAngularModule, CustomerModal],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers implements OnInit {
  ngOnInit(): void {
    this.loadCustomers(this.currentPage, this.pageSize, this.searchTerm, this.selectedStatus());

    this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      this.currentPage = 1;
      this.loadCustomers(this.currentPage, this.pageSize, this.searchTerm, this.selectedStatus());
    });
  }
  private customersService = inject(CustomersService);
  private searchSubject = new Subject<string>();

  paginatedCustomers = signal<CustomersListWithStatusCounts>(EMPTY_PAGINATED_CUSTOMER_LIST);

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
  isCustomerModalOpen = signal<boolean>(false);
  selectedCustomer = signal<Customer | null>(null);

  loadCustomers(
    pageNumber: number,
    pageSize: number,
    searchTerm: string,
    status: CustomerStatus | null,
  ) {
    this.isLoading.set(true);
    this.customersService.getCustomers(pageNumber, pageSize, searchTerm, status).subscribe({
      next: (res) => {
        if (res && res.succeeded) this.paginatedCustomers.set(res.data);
        else this.paginatedCustomers.set(EMPTY_PAGINATED_CUSTOMER_LIST);

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
    this.loadCustomers(this.currentPage, this.pageSize, this.searchTerm, this.selectedStatus());
  }

  handleView(data: Customer) {
    this.isCustomerModalOpen.set(true);
    this.selectedCustomer.set(data);
  }

  handlePageChange(page: number) {
    this.currentPage = page;
    this.loadCustomers(this.currentPage, this.pageSize, this.searchTerm, this.selectedStatus());
  }

  handleSearch(text: string) {
    this.searchSubject.next(text);
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

  protected refreshCustomers() {
    this.loadCustomers(this.currentPage, this.pageSize, this.searchTerm, this.selectedStatus());
  }

  getStatusTotalCount(status: CustomerStatus): number {
    switch (status) {
      case CustomerStatus.Pending:
        return this.paginatedCustomers().pendingTotalCount;
      case CustomerStatus.Active:
        return this.paginatedCustomers().activeTotalCount;
      case CustomerStatus.Inactive:
        return this.paginatedCustomers().inactiveTotalCount;
      default:
        return 0;
    }
  }
}
