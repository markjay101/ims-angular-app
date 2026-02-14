import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { User } from '@shared/models/user';
import { UserRole } from '@constants/role';

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
    userName: ['', [Validators.required, Validators.minLength(3), Validators.email]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    role: [UserRole.Admin, Validators.required],
  });

  protected isRoleOptionsOpen = signal(false);
  protected roleOptions = [
    { value: UserRole.Admin, label: 'Administrator' },
    { value: UserRole.SuperAdmin, label: 'Super Administrator' },
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
    return this.roleOptions.find((r) => r.value === roleValue)?.label || 'Select Role';
  }

  selectRole(value: UserRole) {
    this.adminForm.get('role')?.setValue(value);
    this.isRoleOptionsOpen.set(false);
  }

  submit() {
    if (this.adminForm.valid) {
      this.onSave.emit(this.adminForm.getRawValue());
    } else {
      this.adminForm.markAllAsTouched();
    }
  }
}
