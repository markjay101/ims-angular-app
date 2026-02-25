import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '@services/auth-service';
import { UserRole } from '@constants/role';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private authService = inject(AuthService);
  currentUser = this.authService.currentUser;
  currentUserRole = this.currentUser()?.role as UserRole;

  isCollapsed = signal(false);
  isMobileMenuOpen = signal(false);

  navItems = [
    {
      label: 'Dashboard',
      icon: 'layout-dashboard',
      path: '/',
      userRoleAccess: [UserRole.Admin, UserRole.SuperAdmin],
    },
    {
      label: 'Admin Management',
      icon: 'shield-user',
      path: '/admin-management',
      userRoleAccess: [UserRole.SuperAdmin],
    },
    {
      label: 'Payment Methods',
      icon: 'credit-card',
      path: '/payment-methods',
      userRoleAccess: [UserRole.SuperAdmin],
    },
    {
      label: 'Internet Plans',
      icon: 'wifi',
      path: '/internet-plans',
      userRoleAccess: [UserRole.Admin, UserRole.SuperAdmin],
    },
    {
      label: 'Modems',
      icon: 'router',
      path: '/modems',
      userRoleAccess: [UserRole.Admin, UserRole.SuperAdmin],
    },
    {
      label: 'Customers',
      icon: 'users',
      path: '/customers',
      userRoleAccess: [UserRole.Admin, UserRole.SuperAdmin],
    },
    {
      label: 'Applications',
      icon: 'file-user',
      path: '/applications',
      userRoleAccess: [UserRole.Admin, UserRole.SuperAdmin],
    },
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
    this.authService.logout();
  }
}
