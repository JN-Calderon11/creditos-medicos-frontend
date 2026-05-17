export type ToastType = 'success' | 'error';

export interface Toast {
  type: ToastType;
  title: string;
  message: string;
  timeout?: number;
}