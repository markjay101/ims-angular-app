import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../../core/services/user/user-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../../../shared/models/api-response';
import { UserToken } from '../../../shared/models/user-token';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, LucideAngularModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isLoading = signal(false);

  loginForm = inject(FormBuilder).nonNullable.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);

    this.userService.login(this.loginForm.getRawValue()).subscribe({
      next: (response: ApiResponse<UserToken>) => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] ?? '/';
        this.router.navigateByUrl(returnUrl);
      },
    });
  }
}
