import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
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
}
