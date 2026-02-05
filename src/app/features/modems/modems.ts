import { Component, inject, OnInit, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ModemsService } from '../../core/services/modems-service';
import { PaginatedList } from '../../shared/models/paginated-list';
import { Modem } from '../../shared/models/modem';
import { Table } from '../../shared/components/table/table';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-modems',
  imports: [LucideAngularModule, Table],
  templateUrl: './modems.html',
  styleUrl: './modems.css',
})
export class Modems implements OnInit {
  private modemService = inject(ModemsService);
  private searchSubject = new Subject<string>();

  paginatedModems = signal<PaginatedList<Modem>>({
    items: [],
    totalCount: 0,
    pageNumber: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  modemColumns = [
    { key: 'mdoel', label: 'Model' },
    { key: 'serialNumber', label: 'Serial Number' },
    { key: 'macAddress', label: 'Mac Address' },
    { key: 'actions', label: 'Actions' },
  ];

  currentPage = 1;
  pageSize = 25;
  searchTerm = '';

  isLoading = signal<boolean>(false);
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
    this.isFormOpen.set(true);
  }
}
