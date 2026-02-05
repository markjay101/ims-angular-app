import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { Modem } from '../../../shared/models/modem';

@Component({
  selector: 'app-modem-form',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './modem-form.html',
  styleUrl: './modem-form.css',
})
export class ModemForm {
  modemData = input<Modem | null>(null);

  private fb = inject(FormBuilder);
  modemForm: FormGroup = this.fb.group({
    model: ['', Validators.required],
    serialNumber: ['', Validators.required],
    macAddress: ['', Validators.required],
  });

  isSaving = input<boolean>(false);

  onCancel = output<void>();
  onSave = output<any>();

  constructor() {
    effect(() => {
      const modem = this.modemData();
      if (modem) this.modemForm.patchValue(modem);
      else this.modemForm.reset();
    });
  }

  submit() {
    if (this.modemForm.valid) {
      this.onSave.emit(this.modemForm.getRawValue());
    } else {
      this.modemForm.markAllAsTouched();
    }
  }
}
