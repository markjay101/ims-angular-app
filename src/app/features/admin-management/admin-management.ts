import { Component, inject } from '@angular/core';
import { Table } from '../../shared/components/table/table';
import { UserService } from '../../core/services/user/user-service';

@Component({
  selector: 'app-admin-management',
  imports: [Table],
  templateUrl: './admin-management.html',
  styleUrl: './admin-management.css',
})
export class AdminManagement {
  private userService = inject(UserService);
  users = this.userService.getUsers();

  userColumns = [
    { key: 'userName', label: 'Username' },
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'role', label: 'Role' },
    { key: 'createdAt', label: 'Joined Date' },
  ];
}
