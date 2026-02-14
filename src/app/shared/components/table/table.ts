import { CommonModule } from '@angular/common';
import { Component, input, output, signal, TemplateRef } from '@angular/core';
import { PaginatedList } from '@shared/models/paginated-list';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-table',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  data = input.required<PaginatedList<any>>();
  columns = input<{ key: string; label: string }[]>([]);
  columnTemplates = input<Record<string, TemplateRef<any>>>({});
  isLoading = input<boolean>(false);

  pageChange = output<number>();
  searchChange = output<string>();

  onPageClick(newPage: number) {
    this.pageChange.emit(newPage);
  }

  onSearch(event: Event) {
    this.isLoading.apply(true);
    const input = event.target as HTMLInputElement;
    this.searchChange.emit(input.value);
  }
}
