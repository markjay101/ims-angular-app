import { CommonModule } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  data = input<any[]>([]);
  columns = input<{ key: string; label: string }[]>([]);
  columnTemplates = input<Record<string, TemplateRef<any>>>({});
}
