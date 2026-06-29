import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { demoCompanies, demoUsers } from '../../demo-data/reporting-demo.data';

@Component({
  selector: 'app-admin-table-page',
  standalone: true,
  imports: [NzButtonModule, NzIconModule, NzTableModule, NzTagModule],
  templateUrl: './admin-table-page.component.html',
  styleUrl: './admin-table-page.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminTablePageComponent {
  private readonly route = inject(ActivatedRoute);
  readonly entity = computed(() => this.route.snapshot.data['entity'] as 'companies' | 'users');
  readonly companies = demoCompanies;
  readonly users = demoUsers;
}
