import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { DemoReportFilterState } from '../../../../demo-data/reporting-demo.models';

@Component({
  selector: 'app-report-filter-summary',
  standalone: true,
  imports: [FormsModule, NzIconModule, NzSelectModule, NzTagModule],
  templateUrl: './report-filter-summary.component.html',
  styleUrl: './report-filter-summary.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportFilterSummaryComponent {
  @Input({ required: true }) category = '';
  @Input({ required: true }) filters: DemoReportFilterState = {
    period: '12m',
    segment: 'all',
  };
  @Input() resultCount = 0;
  @Output() filtersChange = new EventEmitter<DemoReportFilterState>();

  readonly periodOptions = [
    { label: 'Last 6 months', value: '6m' },
    { label: 'Last 12 months', value: '12m' },
  ] as const;

  get segmentOptions(): { label: string; value: DemoReportFilterState['segment'] }[] {
    if (this.category === 'Operations') {
      return [
        { label: 'All lanes', value: 'all' },
        { label: 'Active operations', value: 'primary' },
        { label: 'Recovered lanes', value: 'secondary' },
        { label: 'Critical exceptions', value: 'risk' },
      ];
    }

    return [
      { label: 'All suppliers', value: 'all' },
      { label: 'Strategic suppliers', value: 'primary' },
      { label: 'Top performers', value: 'secondary' },
      { label: 'Watchlist', value: 'risk' },
    ];
  }

  updatePeriod(period: DemoReportFilterState['period']): void {
    this.filtersChange.emit({ ...this.filters, period });
  }

  updateSegment(segment: DemoReportFilterState['segment']): void {
    this.filtersChange.emit({ ...this.filters, segment });
  }

  get periodLabel(): string {
    return this.periodOptions.find((option) => option.value === this.filters.period)?.label ?? '';
  }

  get segmentLabel(): string {
    return this.segmentOptions.find((option) => option.value === this.filters.segment)?.label ?? '';
  }
}
