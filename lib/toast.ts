import type { ToastMessage, ToastVariant } from '@/types';

type ToastListener = (toast: ToastMessage) => void;

class ToastEmitter {
  private listeners = new Set<ToastListener>();

  subscribe(listener: ToastListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  emit(toast: Omit<ToastMessage, 'id'>): void {
    const message: ToastMessage = {
      id: `toast-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
      ...toast,
    };
    this.listeners.forEach((listener) => listener(message));
  }

  private fire(variant: ToastVariant, title: string, description?: string): void {
    this.emit({ variant, title, description });
  }

  success(title: string, description?: string): void {
    this.fire('success', title, description);
  }

  error(title: string, description?: string): void {
    this.fire('error', title, description);
  }

  info(title: string, description?: string): void {
    this.fire('info', title, description);
  }
}

export const toastEmitter = new ToastEmitter();

export const toast = {
  success: (title: string, description?: string) =>
    toastEmitter.success(title, description),
  error: (title: string, description?: string) =>
    toastEmitter.error(title, description),
  info: (title: string, description?: string) =>
    toastEmitter.info(title, description),
};
