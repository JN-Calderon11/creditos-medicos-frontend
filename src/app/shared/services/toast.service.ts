import { Injectable, signal } from "@angular/core";
import { ToastType, Toast } from "../interfaces/toast.interface";

@Injectable({ providedIn: 'root' })
export class ToastService {

    readonly toasts = signal<Toast[]>([]);
    private counter = 0;

    show(message: string, type: ToastType = ToastType.Error): void {
        const id = ++this.counter;
        this.toasts.update(list => [...list, { id, message, type }]);
        setTimeout(() => this.remove(id), 5000);
    }

    remove(id: number): void {
        this.toasts.update(list => list.filter(t => t.id !== id));
    }
}