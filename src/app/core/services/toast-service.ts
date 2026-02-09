import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSignal = signal<Toast[]>([]);

  readonly toasts = this.toastsSignal.asReadonly();

  show(message: string, type: ToastType = 'info') {
    const id = Date.now();
    const newToast = { id, message, type };

    this.toastsSignal.update((all) => [...all, newToast]);

    setTimeout(() => this.remove(id), 3000);
  }

  remove(id: number) {
    this.toastsSignal.update((all) => all.filter((t) => t.id !== id));
  }
}
