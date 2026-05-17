import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { Login } from './features/auth/pages/login/login';
import { Home } from './features/dashboard/pages/home/home';
import { Credits } from './features/financial/pages/credits/credits';
import { Alerts } from './features/notification/pages/alerts/alerts';
import { CompanyList } from './features/company/pages/company-list/company-list';

export const routes: Routes = [
  { path: '', redirectTo: 'credits', pathMatch: 'full' },

  { path: 'login', component: Login },
  { path: 'home', component: Home, canActivate: [authGuard] },

  { path: 'credits', component: Credits },

  { path: 'alerts', component: Alerts, canActivate: [authGuard] },
  { path: 'companies', component: CompanyList, canActivate: [authGuard] },

  { path: '**', redirectTo: 'credits' }
];