import { Component, ElementRef, HostListener, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar, SidebarPhase } from './sidebar/sidebar';
import { ThemeService } from '../../../../core/services/theme.service';
import { AuthService } from '../../../auth/services/auth.service';

const SIDEBAR_PHASE_KEY = 'sidebar_phase';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, Sidebar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  readonly theme = inject(ThemeService);
  private readonly auth = inject(AuthService);
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly menuOpen = signal(false);
  readonly fullname = signal<string>('');
  readonly username = signal<string>('');
  readonly sidebarPhase = signal<SidebarPhase>(this.readStoredPhase());

  ngOnInit(): void {
    this.theme.apply();
    this.fullname.set(this.auth.getFullname() ?? '');
    this.username.set(this.auth.getUsername() ?? '');
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  cycleSidebar(): void {
    const next = ((this.sidebarPhase() + 1) % 3) as SidebarPhase;
    this.sidebarPhase.set(next);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(SIDEBAR_PHASE_KEY, String(next));
    }
  }

  private readStoredPhase(): SidebarPhase {
    if (typeof localStorage === 'undefined') return 0;
    const raw = Number(localStorage.getItem(SIDEBAR_PHASE_KEY));
    return raw === 1 || raw === 2 ? (raw as SidebarPhase) : 0;
  }

  onLogOut(): void {
    this.menuOpen.set(false);
    this.auth.logout();
  }

  initials(): string {
    const source = this.fullname() || this.username();
    if (!source) return '?';
    return source
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(w => w.charAt(0).toUpperCase())
      .join('');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.menuOpen()) return;
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.menuOpen.set(false);
    }
  }
}
