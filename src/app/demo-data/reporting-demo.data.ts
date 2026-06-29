import {
  DemoCompany,
  DemoExportJob,
  DemoFolder,
  DemoReport,
  DemoUser,
} from './reporting-demo.models';

export const demoCompanies: DemoCompany[] = [
  { id: 'northstar', code: 'NSF', name: 'Northstar Foods', status: 'Active', users: 46, reports: 18 },
  { id: 'harbor', code: 'HBL', name: 'Harbor Logistics', status: 'Active', users: 29, reports: 12 },
  { id: 'atlas', code: 'ARG', name: 'Atlas Retail Group', status: 'Review', users: 64, reports: 24 },
];

export const demoFolders: DemoFolder[] = [
  {
    key: 'performance',
    name: 'Performance reports',
    description: 'Operational and procurement scorecards',
    count: 1,
  },
  {
    key: 'archive',
    name: 'Archived reports',
    description: 'Empty folder for navigation state',
    count: 0,
  },
];

export const demoReports: DemoReport[] = [
  {
    key: 'lead-time',
    name: 'Lead Time Performance',
    folderKey: 'performance',
    category: 'Operations',
    type: 'Operational',
    description: 'Execution report with KPIs, trend analysis, route exceptions, progress breakdowns and annotated events.',
    modified: 'Jun 24, 2026',
    favorite: true,
    icon: 'line-chart',
    chartType: 'line',
    chartLabel: 'On-time rate',
    chartData: [82, 84, 83, 87, 86, 89, 91, 90, 92, 94, 93, 95],
    metrics: [
      { label: 'Avg lead time', value: '4.8d', tone: 'success', delta: '-12%' },
      { label: 'On-time rate', value: '93%', tone: 'success', delta: '+5%' },
      { label: 'Open exceptions', value: '17', tone: 'warning', delta: 'Review' },
    ],
    rows: [
      { primary: 'Chicago to Denver', secondary: 'Cross-dock delay reduced after carrier handoff', owner: 'Maya Torres', status: 'At risk', value: 'Jun 27', segment: 'operations' },
      { primary: 'Dallas to Tampa', secondary: 'Recovered after inventory allocation update', owner: 'Noah Singh', status: 'Recovered', value: 'Jun 26', segment: 'recovered' },
      { primary: 'Seattle to Reno', secondary: 'Blocked by transfer capacity and pending pickup slot', owner: 'Elena Brooks', status: 'Blocked', value: 'Jun 30', segment: 'critical' },
    ],
    breakdown: [
      { label: 'Pickup confirmed', value: 94, status: 'success' },
      { label: 'In transit', value: 78, status: 'normal' },
      { label: 'Exception queue', value: 34, status: 'exception' },
    ],
    timeline: [
      { title: 'Route data refreshed', description: '12,480 shipment legs normalized for the selected company.', color: 'green' },
      { title: 'Late transfer spike detected', description: 'Two western lanes moved above the alert threshold.', color: 'red' },
      { title: 'Carrier recovery plan attached', description: 'Ops added the mitigation note used by the AI summary.', color: 'blue' },
    ],
  },
  {
    key: 'vendor-score',
    name: 'Vendor Scorecard',
    folderKey: null,
    category: 'Procurement',
    type: 'Supplier scorecard',
    description: 'Supplier performance view with score distribution, SLA compliance, ranked rows and audit trail.',
    modified: 'Jun 23, 2026',
    favorite: true,
    icon: 'bar-chart',
    chartType: 'bar',
    chartLabel: 'Supplier score',
    chartData: [71, 76, 83, 88, 85, 91, 93, 90, 92, 95, 94, 96],
    metrics: [
      { label: 'Weighted score', value: '91.4', tone: 'processing', delta: '+3.2' },
      { label: 'SLA compliance', value: '96%', tone: 'success', delta: '+4%' },
      { label: 'Contracts at risk', value: '4', tone: 'error', delta: 'Escalate' },
    ],
    rows: [
      { primary: 'Aster Supply Co.', secondary: 'Top quartile delivery and documentation quality', owner: 'Priya Shah', status: 'Healthy', value: '96.2', segment: 'top' },
      { primary: 'Meridian Components', secondary: 'Quality hold rate improved but backlog remains elevated', owner: 'Liam Chen', status: 'Watch', value: '84.7', segment: 'strategic' },
      { primary: 'Northline Packaging', secondary: 'Repeated ASN mismatches and overdue corrective action', owner: 'Sofia Grant', status: 'Blocked', value: '71.3', segment: 'watchlist' },
    ],
    breakdown: [
      { label: 'Quality score', value: 91, status: 'success' },
      { label: 'Delivery score', value: 86, status: 'normal' },
      { label: 'Risk exposure', value: 42, status: 'exception' },
    ],
    timeline: [
      { title: 'Quarterly score recalculated', description: 'Weights applied across quality, delivery and commercial risk.', color: 'green' },
      { title: 'Corrective action overdue', description: 'Northline missed the document-control remediation deadline.', color: 'red' },
      { title: 'Buyer review scheduled', description: 'Procurement team review is queued for the next planning meeting.', color: 'blue' },
    ],
  },
];

export const demoUsers: DemoUser[] = [
  { name: 'Ari Kim', email: 'ari.kim@example.demo', role: 'Administrator', status: 'Active' },
  { name: 'Maya Torres', email: 'maya.torres@example.demo', role: 'Analyst', status: 'Active' },
  { name: 'Noah Singh', email: 'noah.singh@example.demo', role: 'Viewer', status: 'Invited' },
  { name: 'Elena Brooks', email: 'elena.brooks@example.demo', role: 'Manager', status: 'Active' },
];

export const demoExportJobs: DemoExportJob[] = [
  { name: 'Lead Time Performance.pdf', status: 'Completed', progress: 100 },
  { name: 'Vendor Scorecard.xlsx', status: 'Running', progress: 72 },
];
