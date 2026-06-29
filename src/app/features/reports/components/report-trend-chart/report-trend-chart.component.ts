import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-report-trend-chart',
  standalone: true,
  templateUrl: './report-trend-chart.component.html',
  styleUrl: './report-trend-chart.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportTrendChartComponent
  implements AfterViewInit, OnChanges, OnDestroy
{
  @Input({ required: true }) title = '';
  @Input({ required: true }) subtitle = '';
  @Input({ required: true }) chartType: 'line' | 'bar' = 'line';
  @Input({ required: true }) data: number[] = [];

  @ViewChild('chartCanvas') chartCanvas?: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;
  private viewReady = false;

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.renderChart();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.viewReady) {
      this.renderChart();
    }
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  private renderChart(): void {
    const canvas = this.chartCanvas?.nativeElement;
    if (!canvas) {
      return;
    }

    this.destroyChart();

    const labels = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].slice(
      -this.data.length,
    );
    const config: ChartConfiguration<'line' | 'bar'> = {
      type: this.chartType,
      data: {
        labels,
        datasets: [
          {
            label: this.title,
            data: this.data,
            borderColor: '#4DC0B9',
            backgroundColor: this.chartType === 'bar' ? '#4DC0B9' : 'transparent',
            borderWidth: 2,
            fill: false,
            tension: 0.3,
            pointRadius: this.chartType === 'line' ? 5 : 0,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#4DC0B9',
            pointBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: '#ffffff',
            titleColor: '#1e293b',
            bodyColor: '#334155',
            borderColor: '#e2e8f0',
            borderWidth: 1,
            cornerRadius: 8,
            padding: 14,
            titleFont: { size: 13, weight: 'bold', family: 'Inter, sans-serif' },
            bodyFont: { size: 12, family: 'Inter, sans-serif' },
            displayColors: true,
          },
        },
        scales: {
          y: {
            min: 0,
            max: 100,
            grid: { color: '#f1f5f9' },
            border: { display: false },
            ticks: {
              font: { size: 11, family: 'Inter, sans-serif' },
              color: '#94a3b8',
            },
          },
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: {
              font: { size: 12, family: 'Inter, sans-serif' },
              color: '#94a3b8',
            },
          },
        },
      },
    };

    this.chart = new Chart(canvas, config);
  }

  private destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}
