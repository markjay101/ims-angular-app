import { Component, inject, OnInit, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ModemsService } from '@services/modems-service';
import { PaginatedList } from '@shared/models/paginated-list';
import { CreateModemDto, Modem } from '@shared/models/modem';
import { Table } from '@shared/components/table/table';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { FormContainer } from '@shared/components/form-container/form-container';
import { ModemForm } from './components/modem-form/modem-form';
import { Backdrop } from '@shared/components/backdrop/backdrop';
import { ToastService } from '@services/toast-service';

@Component({
  selector: 'app-modems',
  imports: [LucideAngularModule, Table, FormContainer, ModemForm, Backdrop],
  templateUrl: './modems.html',
  styleUrl: './modems.css',
})
export class Modems implements OnInit {
  private modemService = inject(ModemsService);
  private searchSubject = new Subject<string>();
  private toast = inject(ToastService);

  paginatedModems = signal<PaginatedList<Modem>>({
    items: [],
    totalCount: 0,
    pageNumber: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  modemColumns = [
    { key: 'model', label: 'Model' },
    { key: 'serialNumber', label: 'Serial Number' },
    { key: 'macAddress', label: 'Mac Address' },
    { key: 'customer', label: 'Assigned To' },
    { key: 'actions', label: 'Actions' },
  ];

  currentPage = 1;
  pageSize = 25;
  searchTerm = '';

  isLoading = signal<boolean>(false);
  isSaving = signal<boolean>(false);

  selectedModem = signal<Modem | null>(null);
  isFormOpen = signal<boolean>(false);

  ngOnInit(): void {
    this.loadModems(this.currentPage, this.pageSize, this.searchTerm);

    this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      this.currentPage = 1;
      this.loadModems(this.currentPage, this.pageSize, this.searchTerm);
    });
  }

  loadModems(pageNumber: number, pageSize: number, searchTerm: string) {
    this.isLoading.set(true);
    this.modemService.getModems(pageNumber, pageSize, searchTerm).subscribe({
      next: (res) => {
        if (res && res.succeeded) this.paginatedModems.set(res.data);

        this.isLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.isLoading.set(false);
      },
    });
  }

  handlePageChange(page: number) {
    this.currentPage = page;
    this.loadModems(this.currentPage, this.pageSize, this.searchTerm);
  }

  handleSearch(text: string) {
    this.searchSubject.next(text);
  }

  handleAdd() {
    this.selectedModem.set(null);
    this.isFormOpen.set(true);
  }

  handleEdit(data: Modem) {
    this.selectedModem.set(data);
    this.isFormOpen.set(true);
  }

  handleSave(formData: Modem | CreateModemDto) {
    console.log(formData);
    this.isSaving.set(true);

    const id = this.selectedModem()?.id;

    const request$ = id
      ? this.modemService.updateModem({ ...formData, id })
      : this.modemService.createModem(formData);

    request$.subscribe({
      next: (res) => {
        this.isSaving.set(false);
        this.isFormOpen.set(false);
        this.loadModems(this.currentPage, this.pageSize, this.searchTerm);

        this.toast.show(res.message, 'success');
      },
      error: (err) => {
        this.isSaving.set(false);
        console.error(err);
      },
    });
  }
}
