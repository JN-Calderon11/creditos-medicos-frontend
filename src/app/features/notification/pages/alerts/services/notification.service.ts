import { Injectable, signal } from "@angular/core";
import { Toast } from "../toast";

const TIMEOUTS = {
  DEFAULT: 4000,
  SUCCESS: 4000,
  FAILURE: 6000,
  PERSISTENT: 0 
} as const;

@Injectable({ providedIn: 'root' })
export class NotificationService {
    toasts = signal<Toast[]>([]);

    show(toast: Toast) {
        this.toasts.update(list => [...list, toast]);
        const timeout = toast.timeout ?? TIMEOUTS.DEFAULT;
        if (timeout > 0) {
            setTimeout(() => this.remove(toast), timeout);
        }
    }

    success(title: string, message: string, timeout = TIMEOUTS.SUCCESS) {
        this.show({ type: 'success', title, message, timeout });
    }

    failure(title: string, message: string, timeout = TIMEOUTS.FAILURE) {
        this.show({ type: 'error', title, message, timeout });
    }

    remove(toast: Toast) {
        this.toasts.update(list => list.filter(t => t !== toast));
    }
}