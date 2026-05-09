import { Injectable, signal } from "@angular/core";
import { Toast } from "../toast";

const TIMEOUTS = {
    DEFAULT: 4000,
    SUCCESS: 4000,
    ERROR: 6000,
    PERSISTENT: 0
} as const;

@Injectable({ providedIn: 'root' })
export class NotificationService {
    toasts = signal<Toast[]>([]);

    private show(toast: Toast) {
        this.toasts.update(list => [...list, toast]);
        const timeout = toast.timeout ?? TIMEOUTS.DEFAULT;
        if (timeout > 0) {
            setTimeout(() => this.remove(toast), timeout);
        }
    }

    success(title: string, message: string, timeout = TIMEOUTS.SUCCESS) {
        this.show({ type: 'success', title, message, timeout });
    }

    error(message?: string, title = 'Error', timeout = TIMEOUTS.ERROR): void {
        this.show({ type: 'error', title, message: message ?? 'Error inesperado', timeout });
    }

    remove(toast: Toast) {
        this.toasts.update(list => list.filter(t => t !== toast));
    }

}