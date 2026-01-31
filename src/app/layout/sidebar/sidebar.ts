import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { UserService } from '../../core/services/user-service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private userService = inject(UserService);
  private router = inject(Router);

  isCollapsed = signal(false);
  isMobileMenuOpen = signal(false);

  navItems = [
    { label: 'Dashboard', icon: 'layout-dashboard', path: '/' },
    { label: 'Admin Management', icon: 'shield-user', path: '/admin-management' },
    { label: 'Payment Methods', icon: 'credit-card', path: '/payment-methods' },
    { label: 'Internet Plans', icon: 'wifi', path: '/internet-plans' },
    { label: 'Modems', icon: 'router', path: '/modems' },
    { label: 'Customers', icon: 'users', path: '/customers' },
    { label: 'Applications', icon: 'file-user', path: '/application' },
  ];

  toggleDesktop() {
    this.isCollapsed.set(!this.isCollapsed());
    this.isMobileMenuOpen.set(!this.isCollapsed());
  }

  toggleMobile() {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
    this.isCollapsed.set(!this.isMobileMenuOpen());
  }

  clickedLogout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
