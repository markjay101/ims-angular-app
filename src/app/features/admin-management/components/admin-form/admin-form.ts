import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { User } from '../../../../shared/models/user';
import { RoleMap, UserRole, UserRoleString } from '../../../../core/constants/role';

@Component({
  selector: 'app-admin-form',
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './admin-form.html',
  styleUrl: './admin-form.css',
})
export class AdminForm {
  private fb = inject(FormBuilder);

  adminData = input<User | null>(null);

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

  onSave = output<any>();
  onCancel = output<void>();

  isSaving = input<boolean>(false);

  isRoleMenuOpen = signal(false);

  roles = [
    { value: UserRoleString.Admin, label: 'Administrator' },
    { value: UserRoleString.SuperAdmin, label: 'Super Administrator' },
  ];

  adminForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3)]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    role: [UserRoleString.Admin, Validators.required],
  });

  get selectedRoleLabel(): string {
    const roleValue = this.adminForm.get('role')?.value;
    return this.roles.find((r) => r.value === roleValue)?.label || 'Select Role';
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
