import { Component, inject } from '@angular/core';
import { ToastService, ToastType } from '@services/toast-service';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  toastService = inject(ToastService);

  getClasses(type: ToastType) {
    const base = 'text-white ';
    if (type === 'success') return base + 'bg-green-500/80';
    if (type === 'error') return base + 'bg-red-500/80';
    return base + 'bg-blue-500/80';
  }
}
