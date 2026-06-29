import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { languageGuard } from './core/guards/language.guard';
import { provideLocale } from './core/providers/locale.providers';
import { loadTranslations, TranslationService } from './core/services/translation.service';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'es' },
  {
    path: ':lang',
    canActivate: [languageGuard],
    providers: [TranslationService, ...provideLocale()],
    resolve: {
      _t: loadTranslations('common', 'sidebar', 'dashboard', 'reports', 'report-viewer', 'admin', 'export-jobs'),
    },
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard-page.component').then(
            (c) => c.DashboardPageComponent,
          ),
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./features/reports/pages/report-list-page/report-list-page.component').then(
            (c) => c.ReportListPageComponent,
          ),
      },
      {
        path: 'reports/:reportKey',
        loadComponent: () =>
          import('./features/reports/pages/report-viewer-page/report-viewer-page.component').then(
            (c) => c.ReportViewerPageComponent,
          ),
      },
      {
        path: 'companies',
        loadComponent: () =>
          import('./features/admin/admin-table-page.component').then(
            (c) => c.AdminTablePageComponent,
          ),
        data: { entity: 'companies' },
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/admin/admin-table-page.component').then(
            (c) => c.AdminTablePageComponent,
          ),
        data: { entity: 'users' },
      },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ],
  },
  { path: '**', redirectTo: 'es' },
];
