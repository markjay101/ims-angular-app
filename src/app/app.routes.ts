import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin-management',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./features/admin-management/admin-management').then((m) => m.AdminManagement);
    },
  },
];
