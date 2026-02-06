import { EMPTY_PAGINATED_LIST } from './../../shared/models/paginated-list';
import { Component, inject, signal, OnInit } from '@angular/core';
import { Table } from '../../shared/components/table/table';
import { UserService } from '../../core/services/user-service';
import { User } from '../../shared/models/user';
import { ApiResponse } from '../../shared/models/api-response';
import { PaginatedList } from '../../shared/models/paginated-list';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { AdminForm } from './components/admin-form/admin-form';
import { RoleMap } from '../../core/constants/role';
import { Backdrop } from '../../shared/components/backdrop/backdrop';
import { FormContainer } from '../../shared/components/form-container/form-container';
import { AdminStats } from '../../shared/models/admin';

@Component({
  selector: 'app-admin-management',
  imports: [
    Table,
    DatePipe,
    LucideAngularModule,
    UpperCasePipe,
    AdminForm,
    Backdrop,
    FormContainer,
  ],
  templateUrl: './admin-management.html',
  styleUrl: './admin-management.css',
})
export class AdminManagement implements OnInit {
  private userService = inject(UserService);
  private searchSubject = new Subject<string>();

  adminColumns = [
    { key: 'userName', label: 'Admin' },
    { key: 'role', label: 'Role' },
    { key: 'createdAt', label: 'Joined Date' },
    { key: 'actions', label: 'Actions' },
  ];

  adminStats = signal<AdminStats>({ totalAdmins: 0, totalSuperAdmins: 0 });
  selectedAdmin = signal<User | null>(null);
  paginatedAdmins = signal<PaginatedList<User>>(EMPTY_PAGINATED_LIST);

  isLoading = signal(false);
  isFormOpen = signal(false);
  isSaving = signal(false);

  currentPage = 1;
  pageSize = 25;
  searchTerm = '';

  ngOnInit() {
    this.loadData();

    this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      this.currentPage = 1;
      this.loadAdmins(this.currentPage, this.pageSize, this.searchTerm);
    });
  }

  loadAdmins(pageNumber: number, pageSize: number, searchTerm: string) {
    this.isLoading.set(true);
    this.userService.getAdmins(pageNumber, pageSize, searchTerm).subscribe({
      next: (response) => {
        if (response && response.data) this.paginatedAdmins.set(response.data);
        else this.paginatedAdmins.set(EMPTY_PAGINATED_LIST);

        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error(err);
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

  handlePageChange(page: number) {
    this.currentPage = page;
    this.loadAdmins(this.currentPage, this.pageSize, this.searchTerm);
  }

  handleSearch(text: string) {
    this.searchSubject.next(text);
  }

  handleEdit(user: User) {
    this.selectedAdmin.set(user);
    this.isFormOpen.set(true);
  }

  handleAdd() {
    this.selectedAdmin.set(null);
    this.isFormOpen.set(true);
  }

  handleSave(formData: any) {
    this.isSaving.set(true);

    const adminId = this.selectedAdmin()?.id;

    const payload = {
      ...formData,
      role: RoleMap[formData.role],
    };

    const request$ = adminId
      ? this.userService.updateAdmin({ ...payload, id: adminId })
      : this.userService.createAdmin(payload);

    request$.subscribe({
      next: (response: ApiResponse<any>) => {
        this.isSaving.set(false);
        this.isFormOpen.set(false);
        this.loadData();

        console.log(response.message);
      },
      error: (err) => {
        this.isSaving.set(false);
        console.error(err);
      },
    });
  }

  protected getRoleClass(role: string): string {
    switch (role) {
      case 'SuperAdmin':
        return 'bg-[#fffbeb] text-[#d97706] border-[#d97706]';
      case 'Admin':
        return 'bg-[#faf5ff] text-[#9333ea] border-[#9333ea]';
      default:
        return 'bg-slate-50 text-slate-500 border-slate-200';
    }
  }

  private loadData() {
    this.loadAdminStats();
    this.loadAdmins(this.currentPage, this.pageSize, this.searchTerm);
  }
}
