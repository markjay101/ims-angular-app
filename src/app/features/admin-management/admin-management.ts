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

  isLoading = signal(false);
  adminColumns = [
    { key: 'userName', label: 'Admin' },
    { key: 'role', label: 'Role' },
    { key: 'createdAt', label: 'Joined Date' },
    { key: 'actions', label: 'Actions' },
  ];

  paginatedAdmins = signal<PaginatedList<User>>({
    items: [],
    totalCount: 0,
    pageNumber: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  adminStats = signal<AdminStats>({ totalAdmins: 0, totalSuperAdmins: 0 });

  currentPage = 1;
  pageSize = 25;
  searchTerm = '';
  private searchSubject = new Subject<string>();

  isFormOpen = signal(false);
  selectedAdmin = signal<User | null>(null);

  ngOnInit() {
    this.loadAdminStats();
    this.loadAdmins(this.currentPage, this.pageSize, this.searchTerm);

    this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      this.currentPage = 1;
      this.loadAdmins(this.currentPage, this.pageSize, this.searchTerm);
    });
  }

  loadAdmins(pageNumber: Number, pageSize: Number, searchTerm: string) {
    this.isLoading.set(true);
    this.userService.getAdmins(pageNumber, pageSize, searchTerm).subscribe({
      next: (response) => {
        if (response && response.data) this.paginatedAdmins.set(response.data);

        this.isLoading.set(false);
      },
    });
  }

  loadAdminStats() {
    this.userService.getAdminStats().subscribe({
      next: (response) => {
        if (response && response.data) this.adminStats.set(response.data);
      },
    });
  }

  onPageChanged(page: number) {
    this.currentPage = page;
    this.loadAdmins(this.currentPage, this.pageSize, this.searchTerm);
  }

  onSearchChanged(text: string) {
    this.searchSubject.next(text);
  }

  openEditForm(user: User) {
    this.selectedAdmin.set(user);
    this.isFormOpen.set(true);
  }

  openAddForm() {
    this.selectedAdmin.set(null);
    this.isFormOpen.set(true);
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
