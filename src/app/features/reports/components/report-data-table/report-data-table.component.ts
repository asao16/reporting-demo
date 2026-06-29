import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { DemoReportRow } from '../../../../demo-data/reporting-demo.models';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-report-data-table',
  standalone: true,
  imports: [NzTableModule, NzTagModule, TranslatePipe],
  templateUrl: './report-data-table.component.html',
  styleUrl: './report-data-table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportDataTableComponent {
  @Input({ required: true }) rows: DemoReportRow[] = [];
  @Input() primaryLabel = 'Item';
  @Input() valueLabel = 'Value';

  tagColor(status: DemoReportRow['status']): 'success' | 'error' | 'warning' {
    return status === 'Recovered' || status === 'Healthy'
      ? 'success'
      : status === 'Blocked'
        ? 'error'
        : 'warning';
  }
}
