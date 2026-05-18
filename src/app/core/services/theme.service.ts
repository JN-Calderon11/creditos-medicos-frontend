import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'app-theme';
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly isDark = signal<boolean>(this.loadPreference() === 'dark');

  apply(): void {
    this.setTheme(this.isDark() ? 'dark' : 'light');
  }

  toggle(): void {
    this.isDark.update(v => !v);
    this.setTheme(this.isDark() ? 'dark' : 'light');
  }

  private setTheme(theme: 'dark' | 'light'): void {
    if (!this.isBrowser) return;
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
  }

  private loadPreference(): string {
    if (!this.isBrowser) return 'light';
    return localStorage.getItem(this.STORAGE_KEY) ?? 'light';
  }
}
