import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { DemoReportFilterState } from '../../../../demo-data/reporting-demo.models';
import { TranslationService } from '../../../../core/services/translation.service';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-report-filter-summary',
  standalone: true,
  imports: [FormsModule, NzIconModule, NzSelectModule, NzTagModule, TranslatePipe],
  templateUrl: './report-filter-summary.component.html',
  styleUrl: './report-filter-summary.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportFilterSummaryComponent {
  private readonly translations = inject(TranslationService);
  @Input({ required: true }) category = '';
  @Input({ required: true }) filters: DemoReportFilterState = {
    period: '12m',
    segment: 'all',
  };
  @Input() resultCount = 0;
  @Output() filtersChange = new EventEmitter<DemoReportFilterState>();

  readonly periodOptions = [
    { labelKey: 'filters.last-6-months', value: '6m' },
    { labelKey: 'filters.last-12-months', value: '12m' },
  ] as const;

  get segmentOptions(): { labelKey: string; value: DemoReportFilterState['segment'] }[] {
    if (this.category === 'Operations') {
      return [
        { labelKey: 'filters.all-lanes', value: 'all' },
        { labelKey: 'filters.active-operations', value: 'primary' },
        { labelKey: 'filters.recovered-lanes', value: 'secondary' },
        { labelKey: 'filters.critical-exceptions', value: 'risk' },
      ];
    }

    return [
      { labelKey: 'filters.all-suppliers', value: 'all' },
      { labelKey: 'filters.strategic-suppliers', value: 'primary' },
      { labelKey: 'filters.top-performers', value: 'secondary' },
      { labelKey: 'filters.watchlist', value: 'risk' },
    ];
  }

  updatePeriod(period: DemoReportFilterState['period']): void {
    this.filtersChange.emit({ ...this.filters, period });
  }

  updateSegment(segment: DemoReportFilterState['segment']): void {
    this.filtersChange.emit({ ...this.filters, segment });
  }

  get periodLabel(): string {
    const option = this.periodOptions.find((item) => item.value === this.filters.period);
    return option ? this.translations.get(option.labelKey) : '';
  }

  get segmentLabel(): string {
    const option = this.segmentOptions.find((item) => item.value === this.filters.segment);
    return option ? this.translations.get(option.labelKey) : '';
  }
}
