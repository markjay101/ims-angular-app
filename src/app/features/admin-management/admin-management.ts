import { Component, inject, signal, OnInit, effect } from '@angular/core';
import { Table } from '../../shared/components/table/table';
import { UserService } from '../../core/services/user/user-service';
import { User } from '../../shared/models/user';
import { ApiResponse } from '../../shared/models/api-response';
import { PaginatedList } from '../../shared/models/paginated-list';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { AdminStats } from '../../shared/models/admin-stats';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminForm } from './components/admin-form/admin-form';

@Component({
  selector: 'app-admin-management',
  imports: [Table, DatePipe, LucideAngularModule, UpperCasePipe, AdminForm],
  templateUrl: './admin-management.html',
  styleUrl: './admin-management.css',
})
export class AdminManagement implements OnInit {
  private userService = inject(UserService);

  adminColumns = [
    { key: 'userName', label: 'Admin' },
    { key: 'role', label: 'Role' },
    { key: 'createdAt', label: 'Joined Date' },
    { key: 'actions', label: 'Actions' },
  ];

  pageAdmins = signal<PaginatedList<User>>({
    items: [],
    totalCount: 0,
    pageNumber: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  isLoading = signal(false);

  currentPage = 1;
  pageSize = 25;
  searchTerm = '';
  private searchSubject = new Subject<string>();

  adminStats = signal<AdminStats>({ totalAdmins: 6, totalSuperAdmins: 6 });

  isDrawerOpen = signal(false);
  selectedAdmin = signal<User | null>(null);

  ngOnInit() {
    this.loadAdminStats();
    this.loadAdmins(this.currentPage, this.pageSize);

    this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      this.currentPage = 1;
      this.loadAdmins(this.currentPage, this.pageSize, this.searchTerm);
    });
  }

  loadAdmins(pageNumber: Number = 1, pageSize: Number = 25, searchTerm: string = '') {
    this.isLoading.set(true);
    this.userService.getAdmins(pageNumber, pageSize, searchTerm).subscribe({
      next: (response) => {
        if (response && response.data) this.pageAdmins.set(response.data);

        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        const apiError = err.error as ApiResponse<any>;

        if (apiError?.errors?.length > 0) console.error(apiError.errors[0]);
        else console.error('A connection error occurred. Please try again.');
      },
    });
  }

  loadAdminStats() {
    this.userService.getAdminStats().subscribe({
      next: (response) => {
        if (response && response.data) this.adminStats.set(response.data);
      },
      error: (err) => {
        this.isLoading.set(false);
        const apiError = err.error as ApiResponse<any>;

        if (apiError?.errors?.length > 0) console.error(apiError.errors[0]);
        else console.error('A connection error occurred. Please try again.');
      },
    });
  }

  onPageChanged(page: number) {
    this.currentPage = page;
    this.loadAdmins(this.currentPage, this.pageSize);
  }

  onSearchChanged(text: string) {
    this.searchSubject.next(text);
  }

  openEditDrawer(user: User) {
    this.selectedAdmin.set(user);
    this.isDrawerOpen.set(true);
  }

  openCreateDrawer() {
    this.selectedAdmin.set(null);
    this.isDrawerOpen.set(true);
  }

  handleSave(formData: any) {
    this.isLoading.set(true);

    const adminId = this.selectedAdmin()?.id;

    // logic to choose Update vs Create
    // const request$ = adminId
    //   ? this.userService.updateAdmin(adminId, formData)
    //   : this.userService.createAdmin(formData);

    // request$.subscribe({
    //   next: (response) => {
    //     this.isLoading.set(false);
    //     this.isDrawerOpen.set(false); // Close drawer
    //     this.refreshData(); // Helper to reload table/stats
    //   },
    //   error: (err) => {
    //     this.isLoading.set(false);
    //     console.error('Save failed', err);
    //   },
    // });
  }

  getRoleClass(role: string): string {
    switch (role) {
      case 'SuperAdmin':
        return 'bg-[#fffbeb] text-[#d97706] border-[#d97706]';
      case 'Admin':
        return 'bg-[#faf5ff] text-[#9333ea] border-[#9333ea]';
      default:
        return 'bg-slate-50 text-slate-500 border-slate-200';
    }
  }
}
