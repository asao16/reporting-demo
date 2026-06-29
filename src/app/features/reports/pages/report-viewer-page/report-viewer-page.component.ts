import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { demoReports } from '../../../../demo-data/reporting-demo.data';
import {
  DemoBreakdown,
  DemoMetric,
  DemoReportFilterState,
  DemoReportRow,
  DemoTimelineItem,
} from '../../../../demo-data/reporting-demo.models';
import { ReportTrendChartComponent } from '../../components/report-trend-chart/report-trend-chart.component';
import { ReportFilterSummaryComponent } from '../../components/report-filter-summary/report-filter-summary.component';
import { ReportMetricCardsComponent } from '../../components/report-metric-cards/report-metric-cards.component';
import { ReportBreakdownProgressComponent } from '../../components/report-breakdown-progress/report-breakdown-progress.component';
import { ReportDataTableComponent } from '../../components/report-data-table/report-data-table.component';
import { ReportTimelineComponent } from '../../components/report-timeline/report-timeline.component';
import { ReportSupplierCardsComponent } from '../../components/report-supplier-cards/report-supplier-cards.component';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { TranslationService } from '../../../../core/services/translation.service';

@Component({
  selector: 'app-report-viewer-page',
  standalone: true,
  imports: [
    RouterLink,
    NzButtonModule,
    NzCardModule,
    NzIconModule,
    NzInputModule,
    NzProgressModule,
    NzTableModule,
    NzTabsModule,
    NzTagModule,
    ReportBreakdownProgressComponent,
    ReportDataTableComponent,
    ReportFilterSummaryComponent,
    ReportMetricCardsComponent,
    ReportSupplierCardsComponent,
    ReportTimelineComponent,
    ReportTrendChartComponent,
    TranslatePipe,
  ],
  templateUrl: './report-viewer-page.component.html',
  styleUrl: './report-viewer-page.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportViewerPageComponent {
  private readonly translations = inject(TranslationService);
  readonly reportKey = input.required<string>();
  readonly activeSection = signal(0);
  readonly isChatOpen = signal(true);
  readonly filters = signal<DemoReportFilterState>({
    period: '12m',
    segment: 'all',
  });
  readonly report = computed(
    () => demoReports.find((item) => item.key === this.reportKey()) ?? demoReports[0],
  );
  readonly filteredRows = computed(() => {
    const segment = this.filters().segment;
    const rows = this.report().rows;

    if (segment === 'all') {
      return rows;
    }

    return rows.filter((row) => this.matchesSegment(row, segment));
  });
  readonly filteredChartData = computed(() => {
    const data = this.applySegmentToChart(this.report().chartData);
    return this.filters().period === '6m' ? data.slice(-6) : data;
  });
  readonly filteredMetrics = computed(() => this.buildFilteredMetrics());
  readonly filteredBreakdown = computed(() => this.buildFilteredBreakdown());
  readonly filteredTimeline = computed(() => this.buildFilteredTimeline());
  readonly aiInsight = computed(() => {
    const timeline = this.filteredTimeline();
    return timeline[1]?.description ?? timeline[0]?.description ?? this.translations.get('insight.ready');
  });
  readonly backQueryParams = computed(() => {
    const folderKey = this.report().folderKey;
    return folderKey ? { folder: folderKey } : null;
  });

  onSectionChange(index: number): void {
    this.activeSection.set(index);
  }

  onFiltersChange(filters: DemoReportFilterState): void {
    this.filters.set(filters);
  }

  toggleChat(): void {
    this.isChatOpen.update((isOpen) => !isOpen);
  }

  private matchesSegment(
    row: DemoReportRow,
    segment: DemoReportFilterState['segment'],
  ): boolean {
    if (this.report().key === 'lead-time') {
      return (
        (segment === 'primary' && row.segment === 'operations') ||
        (segment === 'secondary' && row.segment === 'recovered') ||
        (segment === 'risk' && row.segment === 'critical')
      );
    }

    return (
      (segment === 'primary' && row.segment === 'strategic') ||
      (segment === 'secondary' && row.segment === 'top') ||
      (segment === 'risk' && row.segment === 'watchlist')
    );
  }

  private buildFilteredMetrics(): DemoMetric[] {
    const report = this.report();
    const { period, segment } = this.filters();

    if (segment === 'all' && period === '12m') {
      return report.metrics;
    }

    if (report.key === 'lead-time') {
      const base: DemoMetric[] =
        segment === 'risk'
          ? [
              { label: 'Avg lead time', value: '7.2d', tone: 'error', delta: '+18%' },
              { label: 'On-time rate', value: '68%', tone: 'error', delta: '-14%' },
              { label: 'Open exceptions', value: '1', tone: 'warning', delta: 'Review' },
            ]
          : segment === 'secondary'
            ? [
                { label: 'Avg lead time', value: '4.1d', tone: 'success', delta: '-16%' },
                { label: 'On-time rate', value: '96%', tone: 'success', delta: '+7%' },
                { label: 'Open exceptions', value: '0', tone: 'success', delta: 'Clear' },
              ]
            : segment === 'primary'
              ? [
                  { label: 'Avg lead time', value: '5.3d', tone: 'warning', delta: '+4%' },
                  { label: 'On-time rate', value: '84%', tone: 'warning', delta: '-3%' },
                  { label: 'Open exceptions', value: '1', tone: 'warning', delta: 'Review' },
                ]
              : report.metrics;

      return period === '6m' ? this.withRecentPeriodDeltas(base) : base;
    }

    const base: DemoMetric[] =
      segment === 'risk'
        ? [
            { label: 'Weighted score', value: '71.3', tone: 'error', delta: '-20.1' },
            { label: 'SLA compliance', value: '82%', tone: 'warning', delta: '-9%' },
            { label: 'Contracts at risk', value: '1', tone: 'error', delta: 'Escalate' },
          ]
        : segment === 'secondary'
          ? [
              { label: 'Weighted score', value: '96.2', tone: 'success', delta: '+4.8' },
              { label: 'SLA compliance', value: '99%', tone: 'success', delta: '+3%' },
              { label: 'Contracts at risk', value: '0', tone: 'success', delta: 'Clear' },
            ]
          : segment === 'primary'
            ? [
                { label: 'Weighted score', value: '84.7', tone: 'warning', delta: '-6.7' },
                { label: 'SLA compliance', value: '91%', tone: 'warning', delta: '-2%' },
                { label: 'Contracts at risk', value: '2', tone: 'warning', delta: 'Watch' },
              ]
            : report.metrics;

    return period === '6m' ? this.withRecentPeriodDeltas(base) : base;
  }

  private buildFilteredBreakdown(): DemoBreakdown[] {
    const report = this.report();
    const { period, segment } = this.filters();

    if (segment === 'all' && period === '12m') {
      return report.breakdown;
    }

    const breakdown =
      report.key === 'lead-time'
        ? this.leadTimeBreakdown(segment)
        : this.vendorBreakdown(segment);

    return period === '6m'
      ? breakdown.map((item) => ({
          ...item,
          value: this.clampPercent(item.status === 'exception' ? item.value + 4 : item.value - 2),
        }))
      : breakdown;
  }

  private buildFilteredTimeline(): DemoTimelineItem[] {
    const report = this.report();
    const segment = this.filters().segment;

    if (segment === 'all') {
      return report.timeline;
    }

    const row = this.filteredRows()[0];
    const focus = row?.primary ?? 'Selected segment';

    if (report.key === 'lead-time') {
      return [
        { title: this.translations.get('timeline.selected', { focus }), description: this.translations.get('timeline.visible-kpis', { segment: this.segmentLabel() }), color: 'blue' },
        { title: this.translations.get('timeline.operations-updated'), description: row?.secondary ?? this.translations.get('timeline.no-lanes'), color: segment === 'risk' ? 'red' : 'green' },
        { title: this.translations.get('timeline.ai-context'), description: this.translations.get('timeline.lane-context'), color: 'gray' },
      ];
    }

    return [
      { title: this.translations.get('timeline.selected', { focus }), description: this.translations.get('timeline.scorecard-kpis', { segment: this.segmentLabel() }), color: 'blue' },
      { title: this.translations.get('timeline.suppliers-updated'), description: row?.secondary ?? this.translations.get('timeline.no-suppliers'), color: segment === 'risk' ? 'red' : 'green' },
      { title: this.translations.get('timeline.ai-context'), description: this.translations.get('timeline.supplier-context'), color: 'gray' },
    ];
  }

  private applySegmentToChart(data: number[]): number[] {
    const segment = this.filters().segment;
    const offset = segment === 'risk' ? -12 : segment === 'secondary' ? 4 : segment === 'primary' ? -5 : 0;
    return data.map((value) => this.clampPercent(value + offset));
  }

  private withRecentPeriodDeltas(metrics: DemoMetric[]): DemoMetric[] {
    return metrics.map((metric, index) => ({
      ...metric,
      delta: index === 0 ? `${metric.delta} ${this.translations.get('recent')}` : metric.delta,
    }));
  }

  private leadTimeBreakdown(segment: DemoReportFilterState['segment']): DemoBreakdown[] {
    if (segment === 'risk') {
      return [
        { label: 'Pickup confirmed', value: 72, status: 'normal' },
        { label: 'In transit', value: 61, status: 'normal' },
        { label: 'Exception queue', value: 88, status: 'exception' },
      ];
    }

    if (segment === 'secondary') {
      return [
        { label: 'Pickup confirmed', value: 98, status: 'success' },
        { label: 'In transit', value: 92, status: 'success' },
        { label: 'Exception queue', value: 12, status: 'normal' },
      ];
    }

    if (segment === 'primary') {
      return [
        { label: 'Pickup confirmed', value: 86, status: 'normal' },
        { label: 'In transit', value: 79, status: 'normal' },
        { label: 'Exception queue', value: 46, status: 'exception' },
      ];
    }

    return this.report().breakdown;
  }

  private vendorBreakdown(segment: DemoReportFilterState['segment']): DemoBreakdown[] {
    if (segment === 'risk') {
      return [
        { label: 'Quality score', value: 68, status: 'exception' },
        { label: 'Delivery score', value: 74, status: 'normal' },
        { label: 'Risk exposure', value: 84, status: 'exception' },
      ];
    }

    if (segment === 'secondary') {
      return [
        { label: 'Quality score', value: 98, status: 'success' },
        { label: 'Delivery score', value: 96, status: 'success' },
        { label: 'Risk exposure', value: 18, status: 'normal' },
      ];
    }

    if (segment === 'primary') {
      return [
        { label: 'Quality score', value: 84, status: 'normal' },
        { label: 'Delivery score', value: 82, status: 'normal' },
        { label: 'Risk exposure', value: 57, status: 'exception' },
      ];
    }

    return this.report().breakdown;
  }

  private segmentLabel(): string {
    const segment = this.filters().segment;

    if (this.report().key === 'lead-time') {
      return segment === 'primary'
        ? this.translations.get('filters.active-operations')
        : segment === 'secondary'
          ? this.translations.get('filters.recovered-lanes')
          : segment === 'risk'
            ? this.translations.get('filters.critical-exceptions')
            : this.translations.get('filters.all-lanes');
    }

    return segment === 'primary'
      ? this.translations.get('filters.strategic-suppliers')
      : segment === 'secondary'
        ? this.translations.get('filters.top-performers')
        : segment === 'risk'
          ? this.translations.get('filters.watchlist')
          : this.translations.get('filters.all-suppliers');
  }

  private clampPercent(value: number): number {
    return Math.max(0, Math.min(100, value));
  }
}
