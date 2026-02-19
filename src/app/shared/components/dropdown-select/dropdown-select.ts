import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import {
  Component,
  input,
  model,
  signal,
  TemplateRef,
  ContentChild,
  computed,
  output,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-dropdown-select',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './dropdown-select.html',
  styleUrl: './dropdown-select.css',
})
export class DropdownSelect {
  @ContentChild('itemTemplate') itemTemplate?: TemplateRef<any>;

  options = input<any[]>([]);
  iconName = input<string>('dot');
  isSearchable = input<boolean>(false);
  isLoading = input<boolean>(false);
  isProcessingSelection = input<boolean>(false);
  displayKey = input<string>('name');
  placeholder = input<string>('Select an option');
  disabled = input<boolean>(false);

  selectedItem = model<any | null>(null);

  selectedChanged = output<any>();
  searchChanged = output<string>();

  private searchTerm = signal<string>('');
  isOptionsOpen = signal<boolean>(false);

  toggle() {
    if (this.disabled()) return;
    const opening = !this.isOptionsOpen();
    this.isOptionsOpen.set(opening);

    if ((opening && this.options().length === 0) || this.searchTerm().length !== 0) {
      this.searchChanged.emit('');
    }
  }

  handleSearch(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this.searchTerm.set(term);
    this.searchChanged.emit(term);
  }

  handleSelect(option: any) {
    this.selectedItem.set(option);
    this.selectedChanged.emit(option);
    this.isOptionsOpen.set(false);

    if (this.searchTerm().length !== 0) this.searchChanged.emit('');
  }

  getDisplayValue(): string {
    const item = this.selectedItem();
    if (!item) return '';
    return typeof item === 'string' ? item : item[this.displayKey()];
  }
}
