import { Component, inject } from '@angular/core';
import { NotificationService } from './services/notification.service';
import { ToastType } from './toast';

@Component({
  selector: 'app-alerts',
  imports: [],
  templateUrl: './alerts.html',
  styleUrl: './alerts.css',
})
export class Alerts {
  toastService = inject(NotificationService);

  alertClass(type: ToastType): string {
    return {
      success: 'alert-success',
      error: 'alert-danger'
    }[type];
  }

  iconClass(type: ToastType): string {
    return {
      success: 'bi-check-circle-fill',
      error: 'bi-x-octagon-fill'
    }[type];
  }
}
