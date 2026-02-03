import { Component, input, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-form-container',
  imports: [LucideAngularModule],
  templateUrl: './form-container.html',
  styleUrl: './form-container.css',
})
export class FormContainer {
  isFormOpen = input.required<boolean>();
  formHeader = input.required<string>();
  formSubHeader = input.required<string>();

  closeForm = output<void>();
}
