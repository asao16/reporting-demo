import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { DemoReportRow } from '../../../../demo-data/reporting-demo.models';

@Component({
  selector: 'app-report-supplier-cards',
  standalone: true,
  imports: [NzTagModule],
  templateUrl: './report-supplier-cards.component.html',
  styleUrl: './report-supplier-cards.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportSupplierCardsComponent {
  @Input({ required: true }) rows: DemoReportRow[] = [];

  tagColor(status: DemoReportRow['status']): 'success' | 'error' | 'warning' {
    return status === 'Healthy'
      ? 'success'
      : status === 'Blocked'
        ? 'error'
        : 'warning';
  }
}
