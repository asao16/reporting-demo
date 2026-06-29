import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';

import { demoCompanies, demoReports } from '../../demo-data/reporting-demo.data';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [RouterLink, NzIconModule, NzTableModule, TranslatePipe],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
  readonly totalUsers = demoCompanies.reduce((sum, company) => sum + company.users, 0);
  readonly totalReports = demoCompanies.reduce((sum, company) => sum + company.reports, 0);
  readonly totalCompanies = demoCompanies.length;
  readonly totalIntegrations = 7;
  readonly favoriteReports = demoReports.filter((report) => report.favorite);
}
