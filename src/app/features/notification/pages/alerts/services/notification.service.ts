import { Injectable, signal } from "@angular/core";
import { Toast } from "../toast";

const TIMEOUT: number = 4000;

@Injectable({ providedIn: 'root' })
export class NotificationService {
    toasts = signal<Toast[]>([]);

    show(toast: Toast) {
        this.toasts.update(list => [...list, toast]);
        const timeout = toast.timeout ?? TIMEOUT;
        if (timeout > 0) {
            setTimeout(() => this.remove(toast), timeout);
        }
    }

    success(title: string, message: string, timeout = TIMEOUT) {
        this.show({ type: 'success', title, message, timeout });
    }

    failure(title: string, message: string, timeout = TIMEOUT) {
        this.show({ type: 'error', title, message, timeout });
    }

    remove(toast: Toast) {
        this.toasts.update(list => list.filter(t => t !== toast));
    }
}