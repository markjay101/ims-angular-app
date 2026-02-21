import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: async () => {
      const m = await import('@public-page/login/login');
      return m.Login;
    },
  },
  {
    path: 'apply',
    pathMatch: 'full',
    loadComponent: async () => {
      const m = await import('@public-page/application/application');
      return m.Application;
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
        path: '',
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('@dashboard/dashboard');
          return m.Dashboard;
        },
      },
      {
        path: 'admin-management',
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('@admin-management/admin-management');
          return m.AdminManagement;
        },
      },
      {
        path: 'payment-methods',
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('@payment-methods/payment-methods');
          return m.PaymentMethods;
        },
      },
      {
        path: 'internet-plans',
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('@internet-plans/internet-plans');
          return m.InternetPlans;
        },
      },
      {
        path: 'modems',
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('@modems/modems');
          return m.Modems;
        },
      },
      {
        path: 'applications',
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('@applications/applications');
          return m.Applications;
        },
      },
      {
        path: 'customers',
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('@customers/customers');
          return m.Customers;
        },
      },
    ],
  },
];
