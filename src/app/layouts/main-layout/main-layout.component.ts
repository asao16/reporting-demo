import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { demoCompanies, demoExportJobs } from '../../demo-data/reporting-demo.data';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NzBadgeModule,
    NzButtonModule,
    NzDrawerModule,
    NzDropDownModule,
    NzIconModule,
    NzProgressModule,
    NzSelectModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  readonly collapsed = signal(false);
  readonly mobileOpen = signal(false);
  readonly exportPanelOpen = signal(false);
  readonly isMobile = signal(window.innerWidth < 768);
  readonly companies = demoCompanies;
  readonly exportJobs = demoExportJobs;
  selectedCompanyId = demoCompanies[0].id;

  readonly menuItems = [
    { route: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { route: '/reports', icon: 'file-text', label: 'Reports' },
    { route: '/companies', icon: 'bank', label: 'Companies' },
    { route: '/users', icon: 'user', label: 'Users' },
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
}
