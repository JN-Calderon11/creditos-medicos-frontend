import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { ToastType } from '../../interfaces/toast.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html'
})
export class Toast {
  private readonly toastService = inject(ToastService);
  readonly toasts = this.toastService.toasts;

  readonly ToastType = ToastType;

  remove(id: number): void {
    this.toastService.remove(id);
  }
}
