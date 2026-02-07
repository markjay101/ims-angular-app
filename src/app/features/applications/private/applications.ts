import { Component, inject, OnInit, signal } from '@angular/core';
import { ApplicationService } from '../../../core/services/application-service';
import { Table } from '../../../shared/components/table/table';
import { Application } from '../../../shared/models/application';
import { EMPTY_PAGINATED_LIST, PaginatedList } from '../../../shared/models/paginated-list';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import {
  ApplicationStatus,
  ApplicationStatusStringMap,
} from '../../../core/constants/application-status';
import { ApplicantModal } from './components/applicant-modal/applicant-modal';
import { Backdrop } from '../../../shared/components/backdrop/backdrop';

@Component({
  selector: 'app-applications',
  imports: [Table, UpperCasePipe, DatePipe, LucideAngularModule, ApplicantModal],
  templateUrl: './applications.html',
  styleUrl: './applications.css',
})
export class Applications implements OnInit {
  ngOnInit(): void {
    this.loadApplications(this.currentPage, this.pageSize, this.searchTerm, this.selectedStatus());
  }
  private applicationService = inject(ApplicationService);

  applicationColumns = [
    { key: 'applicant', label: 'Applicant' },
    { key: 'contactNumber', label: 'Contact' },
    { key: 'status', label: 'Status' },
    { key: 'createdAt', label: 'Applied' },
    { key: 'actions', label: 'Actions' },
  ];

  paginatedApplications = signal<PaginatedList<Application>>(EMPTY_PAGINATED_LIST);

  isLoading = signal<boolean>(false);

  currentPage = 1;
  pageSize = 25;
  searchTerm = '';
  selectedStatus = signal<ApplicationStatus | null>(0);

  selectedApplicant = signal<Application | null>(null);
  isApplicantModalOpen = signal<boolean>(false);

  private loadApplications(
    pageNumber: Number = 1,
    pageSize: Number = 25,
    searchTerm: string = '',
    status: ApplicationStatus | null = null,
  ) {
    this.isLoading.set(true);
    this.applicationService.getApplications(pageNumber, pageSize, searchTerm, status).subscribe({
      next: (res) => {
        if (res && res.succeeded) this.paginatedApplications.set(res.data);
        else this.paginatedApplications.set(EMPTY_PAGINATED_LIST);

        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      },
    });
  }

  handlePageChange(page: number) {
    this.currentPage = page;
    this.loadApplications(this.currentPage, this.pageSize, this.searchTerm, this.selectedStatus());
  }

  handleEdit(data: Application) {
    this.isApplicantModalOpen.set(true);
    this.selectedApplicant.set(data);
  }

  handleChangeStatus(status: ApplicationStatus | null) {
    this.selectedStatus.set(status);
    this.loadApplications(this.currentPage, this.pageSize, this.searchTerm, this.selectedStatus());
  }

  protected getStatusClass(status: ApplicationStatus): string {
    switch (status) {
      case ApplicationStatus.Pending:
        return 'bg-[#fffbeb] text-[#d97706] border-[#d97706]';
      case ApplicationStatus.Approved:
        return 'bg-[#ecfdf5] text-[#047857] border-[#047857]';
      case ApplicationStatus.Rejected:
        return 'bg-[#fff1f2] text-[#be123c] border-[#be123c]';
      default:
        return 'bg-slate-50 text-slate-500 border-slate-200';
    }
  }

  getStatusString(status: ApplicationStatus): string {
    return ApplicationStatusStringMap[status];
  }
}
