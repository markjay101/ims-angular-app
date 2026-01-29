import { Component, computed, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { User } from '../../../../shared/models/user';

@Component({
  selector: 'app-admin-form',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './admin-form.html',
  styleUrl: './admin-form.css',
})
export class AdminForm {
  private fb = inject(FormBuilder);

  @Input() set adminData(user: User | null) {
    this._selectedAdmin.set(user);
    if (user) {
      this.adminForm.patchValue(user);
      this.adminForm.get('userName')?.disable();
    } else {
      this.adminForm.reset({ role: 'Admin' });
      this.adminForm.get('userName')?.enable();
    }
  }

  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  private _selectedAdmin = signal<User | null>(null);
  adminDataSignal = computed(() => this._selectedAdmin());
  isRoleMenuOpen = signal(false);

  roles = [
    { value: 'Admin', label: 'Administrator' },
    { value: 'SuperAdmin', label: 'Super Administrator' },
  ];

  adminForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3)]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    role: ['Admin', Validators.required],
  });

  get selectedRoleLabel(): string {
    const roleValue = this.adminForm.get('role')?.value;
    return this.roles.find((r) => r.value === roleValue)?.label || 'Select Role';
  }

  selectRole(value: string) {
    this.adminForm.get('role')?.setValue(value);
    this.isRoleMenuOpen.set(false);
  }

  submit() {
    if (this.adminForm.valid) {
      this.onSave.emit(this.adminForm.getRawValue());
    } else {
      this.adminForm.markAllAsTouched();
    }
  }
}
