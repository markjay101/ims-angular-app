import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { User } from '../../../../shared/models/user';
import { UserRole, UserRoleString } from '../../../../core/constants/role';

@Component({
  selector: 'app-admin-form',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './admin-form.html',
  styleUrl: './admin-form.css',
})
export class AdminForm {
  adminData = input<User | null>(null);

  private fb = inject(FormBuilder);
  adminForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3)]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    role: [UserRoleString.Admin, Validators.required],
  });

  isRoleMenuOpen = signal(false);
  roleMenu = [
    { value: UserRoleString.Admin, label: 'Administrator' },
    { value: UserRoleString.SuperAdmin, label: 'Super Administrator' },
  ];

  isSaving = input<boolean>(false);

  onSave = output<any>();
  onCancel = output<void>();

  constructor() {
    effect(() => {
      const user = this.adminData();

      if (user) {
        this.adminForm.patchValue(user);
        this.adminForm.get('userName')?.disable();
      } else {
        this.adminForm.reset({ role: UserRole.Admin });
        this.adminForm.get('userName')?.enable();
      }
    });
  }

  get selectedRoleLabel(): string {
    const roleValue = this.adminForm.get('role')?.value;
    return this.roleMenu.find((r) => r.value === roleValue)?.label || 'Select Role';
  }

  selectRole(value: UserRoleString) {
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
