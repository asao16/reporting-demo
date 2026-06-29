import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { demoCompanies, demoExportJobs } from '../../demo-data/reporting-demo.data';
import { DemoExportJob } from '../../demo-data/reporting-demo.models';
import { SupportedLang } from '../../core/guards/language.guard';
import { UserService } from '../../core/services/user.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NzBadgeModule,
    NzButtonModule,
    NzCardModule,
    NzDropDownModule,
    NzIconModule,
    NzSelectModule,
    TranslatePipe,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  readonly collapsed = signal(false);
  readonly mobileOpen = signal(false);
  readonly exportPanelOpen = signal(false);
  readonly isMobile = signal(window.innerWidth < 768);
  readonly companies = demoCompanies;
  readonly exportJobs = demoExportJobs;
  readonly languages: { code: SupportedLang; labelKey: string }[] = [
    { code: 'en', labelKey: 'lang.en' },
    { code: 'es', labelKey: 'lang.es' },
  ];
  readonly currentLanguage = this.userService.selectedLang;
  selectedCompanyId = demoCompanies[0].id;

  readonly menuItems = [
    { route: 'dashboard', icon: 'dashboard', labelKey: 'nav.dashboard' },
    { route: 'reports', icon: 'file-text', labelKey: 'nav.reports' },
    { route: 'companies', icon: 'bank', labelKey: 'nav.companies' },
    { route: 'users', icon: 'user', labelKey: 'nav.users' },
  ];

  @HostListener('window:resize')
  onResize(): void {
    this.isMobile.set(window.innerWidth < 768);
    if (!this.isMobile()) {
      this.mobileOpen.set(false);
    }
  }

  toggleSidebar(): void {
    if (this.isMobile()) {
      this.mobileOpen.update((value) => !value);
      return;
    }

    this.collapsed.update((value) => !value);
  }

  switchLanguage(language: SupportedLang): void {
    const [path, query = ''] = this.router.url.split('?');
    const nextPath = path.replace(/^\/(en|es)(?=\/|$)/, `/${language}`);
    void this.router.navigateByUrl(`${nextPath}${query ? `?${query}` : ''}`);
  }

  exportBadgeStatus(): 'success' | 'warning' | 'error' {
    if (this.exportJobs.some((job) => job.status === 'Failed')) {
      return 'error';
    }

    if (this.exportJobs.some((job) => job.status === 'Pending' || job.status === 'Processing')) {
      return 'warning';
    }

    return 'success';
  }

  getExportCompletedSuffix(job: DemoExportJob): string | null {
    if (!job.completedAt) {
      return null;
    }

    const completed = new Date(job.completedAt);
    const month = completed.toLocaleString('en-US', { month: 'short' });
    const day = String(completed.getDate()).padStart(2, '0');
    const year = completed.getFullYear();
    const hours = String(completed.getHours()).padStart(2, '0');
    const minutes = String(completed.getMinutes()).padStart(2, '0');

    return `${month} ${day}, ${year} ${hours}-${minutes}`;
  }

  getExportStatusKey(status: DemoExportJob['status']): string {
    return `export-jobs.status-${status.toLowerCase()}`;
  }

  getExportDuration(job: DemoExportJob): string | null {
    const start = new Date(job.enqueuedAt).getTime();
    const end = job.completedAt ? new Date(job.completedAt).getTime() : Date.now();
    const totalSeconds = Math.max(0, Math.floor((end - start) / 1000));

    if (totalSeconds < 60) {
      return `${totalSeconds}s`;
    }

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  }

  downloadExport(job: DemoExportJob): void {
    if (job.status !== 'Completed') {
      return;
    }

    const url = `data:text/plain;charset=utf-8,Reporting demo export: ${encodeURIComponent(job.sectionName)}`;
    const link = document.createElement('a');
    link.href = url;
    link.download = `${job.sectionName}.${job.fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
