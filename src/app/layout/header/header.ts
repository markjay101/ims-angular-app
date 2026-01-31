import { Component, inject } from '@angular/core';
import { UserService } from '../../core/services/user-service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private userService = inject(UserService);
  currentUser = this.userService.currentUser;
}
