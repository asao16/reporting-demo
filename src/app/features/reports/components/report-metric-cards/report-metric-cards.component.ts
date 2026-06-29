import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { DemoBreakdown, DemoMetric } from '../../../../demo-data/reporting-demo.models';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-report-metric-cards',
  standalone: true,
  imports: [NzProgressModule, NzTagModule, TranslatePipe],
  templateUrl: './report-metric-cards.component.html',
  styleUrl: './report-metric-cards.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportMetricCardsComponent {
  @Input({ required: true }) metrics: DemoMetric[] = [];
  @Input() breakdown: DemoBreakdown[] = [];
  @Input() variant: 'kpi-grid' | 'score-overview' = 'kpi-grid';
}
