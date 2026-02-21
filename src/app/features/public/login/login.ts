import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '@shared/models/api-response';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '@services/auth-service';
import { UserToken } from '@shared/models/user';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, LucideAngularModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isLoggingIn = signal(false);
  errorMessage = signal('');

  loginForm = inject(FormBuilder).nonNullable.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    if (this.loginForm.invalid || this.isLoggingIn()) return;

    this.isLoggingIn.set(true);
    this.errorMessage.set('');

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (response: ApiResponse<UserToken>) => {
        if (response.succeeded) {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] ?? '/';
          this.router.navigateByUrl(returnUrl);
        }
      },
      error: (err) => {
        this.isLoggingIn.set(false);
        this.errorMessage.set(err);
      },
    });
  }
}
