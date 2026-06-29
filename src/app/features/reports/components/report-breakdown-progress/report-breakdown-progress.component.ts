import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { DemoBreakdown } from '../../../../demo-data/reporting-demo.models';

@Component({
  selector: 'app-report-breakdown-progress',
  standalone: true,
  imports: [NzProgressModule],
  templateUrl: './report-breakdown-progress.component.html',
  styleUrl: './report-breakdown-progress.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportBreakdownProgressComponent {
  @Input({ required: true }) breakdown: DemoBreakdown[] = [];
}
