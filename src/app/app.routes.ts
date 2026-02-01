import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: async () => {
      const m = await import('./features/auth/login/login');
      return m.Login;
    },
  },

  {
    path: '',
    async loadComponent() {
      const m = await import('./layout/main-layout/main-layout');
      return m.MainLayout;
    },
    canActivate: [authGuard],
    children: [
      {
        path: 'admin-management',
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('./features/admin-management/admin-management');
          return m.AdminManagement;
        },
      },
      {
        path: 'payment-methods',
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('./features/payment-methods/payment-methods');
          return m.PaymentMethods;
        },
      },
    ],
  },
];
