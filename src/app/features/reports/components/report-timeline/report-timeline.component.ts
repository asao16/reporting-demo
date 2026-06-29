import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DemoTimelineItem } from '../../../../demo-data/reporting-demo.models';

@Component({
  selector: 'app-report-timeline',
  standalone: true,
  templateUrl: './report-timeline.component.html',
  styleUrl: './report-timeline.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportTimelineComponent {
  @Input({ required: true }) items: DemoTimelineItem[] = [];
}
