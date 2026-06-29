import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { DemoBreakdown } from '../../../../demo-data/reporting-demo.models';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-report-breakdown-progress',
  standalone: true,
  imports: [NzProgressModule, TranslatePipe],
  templateUrl: './report-breakdown-progress.component.html',
  styleUrl: './report-breakdown-progress.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportBreakdownProgressComponent {
  @Input({ required: true }) breakdown: DemoBreakdown[] = [];
}
