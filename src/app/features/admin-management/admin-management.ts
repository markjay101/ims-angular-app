import { Component, inject, signal, OnInit } from '@angular/core';
import { Table } from '../../shared/components/table/table';
import { UserService } from '../../core/services/user-service';
import { User } from '../../shared/models/user';
import { ApiResponse } from '../../shared/models/api-response';
import { PaginatedList } from '../../shared/models/paginated-list';
import { debounceTime, distinctUntilChanged, Observable, Subject } from 'rxjs';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { AdminStats } from '../../shared/models/admin-stats';
import { AdminForm } from './components/admin-form/admin-form';
import { CreateAdminDto } from '../../shared/models/create-admin-dto';
import { UpdateAdminDto } from '../../shared/models/update-admin-dto';
import { RoleMap } from '../../core/constants/role';

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
  isSaving = signal(false);

  ngOnInit() {
    this.loadData();

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
      error: (err) => {
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

  handleSaveAdmin(formData: any) {
    this.isSaving.set(true);

    const adminId = this.selectedAdmin()?.id;

    const payload = {
      ...formData,
      role: RoleMap[formData.role],
    };

    const request$ = adminId
      ? this.userService.updateAdmin({ ...payload, id: adminId } as UpdateAdminDto)
      : this.userService.createAdmin(payload as CreateAdminDto);

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

  private loadData() {
    this.loadAdminStats();
    this.loadAdmins(this.currentPage, this.pageSize, this.searchTerm);
  }
}
