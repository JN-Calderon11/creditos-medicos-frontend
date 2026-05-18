import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { Home } from './features/dashboard/pages/home/home';
import { Overview } from './features/dashboard/pages/overview/overview';
import { Credits } from './features/financial/pages/credits/credits';
import { Planes } from './features/medical/pages/planes/planes';
import { BenefitsPage } from './features/medical/pages/benefits-page/benefits-page';
import { CompanyList } from './features/company/pages/company-list/company-list';
import { Settings } from './features/settings/pages/settings/settings';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'login', component: Login },

  {
    path: 'home',
    component: Home,
    children: [
      { path: '',         redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: Overview    },
      { path: 'planes',   component: Planes      },
      { path: 'benefits', component: BenefitsPage },
      { path: 'users',    component: CompanyList  },
      { path: 'financial',component: Credits      },
      { path: 'settings', component: Settings    },
    ],
  },

  { path: '**', redirectTo: 'home' },
];
