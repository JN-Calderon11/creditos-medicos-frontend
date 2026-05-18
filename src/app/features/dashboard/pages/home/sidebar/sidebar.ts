import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

export type SidebarPhase = 0 | 1 | 2;

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  @Input() phase: SidebarPhase = 0;

  readonly navItems: NavItem[] = [
    { label: 'Inicio',        icon: 'dashboard',                route: '/home/overview'  },
    { label: 'Empresas',      icon: 'domain',                   route: '/home/users'     },
    { label: 'Planes',        icon: 'workspace_premium',        route: '/home/planes'    },
    { label: 'Beneficios',    icon: 'medical_services',         route: '/home/benefits'  },
    { label: 'Créditos',      icon: 'account_balance_wallet',   route: '/home/financial' },
    { label: 'Configuración', icon: 'settings',                 route: '/home/settings'  },
  ];
}
