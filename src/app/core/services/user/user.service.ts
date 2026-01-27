import { Injectable, signal } from '@angular/core';
import { User } from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersSignal = signal<User[]>([
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      role: 'Admin',
      userName: 'admin_mark',
      firstName: 'Mark',
      lastName: 'Dev',
      createdBy: 'System',
      createdAt: '2024-01-01T08:00:00Z',
      updatedBy: 'System',
      updatedAt: '2024-01-05T10:30:00Z',
    },
    {
      id: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
      role: 'Staff',
      userName: 'juandelacruz',
      firstName: 'Juan',
      lastName: 'Dela Cruz',
      createdBy: 'admin_mark',
      createdAt: '2024-02-15T14:20:00Z',
      updatedBy: 'admin_mark',
      updatedAt: '2024-02-15T14:20:00Z',
    },
    {
      id: 'a1b2c3d4-e5f6-4g7h-8i9j-k0l1m2n3o4p5',
      role: 'Support',
      userName: 'maria_tech',
      firstName: 'Maria',
      lastName: 'Clara',
      createdBy: 'admin_mark',
      createdAt: '2024-03-10T09:15:00Z',
      updatedBy: 'admin_mark',
      updatedAt: '2024-03-12T16:45:00Z',
    },
  ]);

  getUsers() {
    return this.usersSignal.asReadonly();
  }
}
