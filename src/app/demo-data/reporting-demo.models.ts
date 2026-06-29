export interface DemoCompany {
  id: string;
  name: string;
  code: string;
  status: 'Active' | 'Review';
  users: number;
  reports: number;
}

export interface DemoReport {
  key: string;
  name: string;
  folderKey: string | null;
  category: string;
  type: string;
  description: string;
  modified: string;
  favorite: boolean;
  icon: string;
  chartType: 'line' | 'bar';
  chartLabel: string;
  chartData: number[];
  metrics: DemoMetric[];
  rows: DemoReportRow[];
  breakdown: DemoBreakdown[];
  timeline: DemoTimelineItem[];
}

export interface DemoFolder {
  key: string;
  name: string;
  description: string;
  count: number;
}

export interface DemoMetric {
  label: string;
  value: string;
  tone: 'success' | 'warning' | 'error' | 'processing';
  delta: string;
}

export interface DemoReportRow {
  primary: string;
  secondary: string;
  owner: string;
  status: 'Recovered' | 'At risk' | 'Blocked' | 'Healthy' | 'Watch';
  value: string;
  segment: 'operations' | 'recovered' | 'critical' | 'strategic' | 'watchlist' | 'top';
}

export interface DemoBreakdown {
  label: string;
  value: number;
  status: 'success' | 'normal' | 'exception';
}

export interface DemoTimelineItem {
  title: string;
  description: string;
  color: 'green' | 'blue' | 'red' | 'gray';
}

export type DemoPeriodFilter = '6m' | '12m';
export type DemoSegmentFilter = 'all' | 'primary' | 'secondary' | 'risk';

export interface DemoReportFilterState {
  period: DemoPeriodFilter;
  segment: DemoSegmentFilter;
}

export interface DemoUser {
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Invited';
}

export interface DemoExportJob {
  name: string;
  status: 'Completed' | 'Running' | 'Queued';
  progress: number;
}
