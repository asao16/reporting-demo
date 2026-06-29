import { expect, test } from '@playwright/test';

async function expectNoHorizontalOverflow(page: import('@playwright/test').Page) {
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return Math.max(doc.scrollWidth, document.body.scrollWidth) - doc.clientWidth;
  });
  expect(overflow).toBeLessThanOrEqual(2);
}

async function expectReportContentScrollsInternally(page: import('@playwright/test').Page) {
  const scrollState = await page.evaluate(() => {
    const pageScroller = document.querySelector<HTMLElement>('.main-layout__content');
    const reportScroller = document.querySelector<HTMLElement>('.report-viewer__content');

    if (!pageScroller || !reportScroller) {
      return null;
    }

    pageScroller.scrollTop = 0;
    reportScroller.scrollTop = 240;

    return {
      pageScrollTop: pageScroller.scrollTop,
      reportScrollTop: reportScroller.scrollTop,
      reportCanScroll: reportScroller.scrollHeight > reportScroller.clientHeight,
    };
  });

  expect(scrollState).not.toBeNull();
  expect(scrollState?.pageScrollTop).toBe(0);
  if (scrollState?.reportCanScroll) {
    expect(scrollState.reportScrollTop).toBeGreaterThan(0);
  }
  await expect(page.locator('.report-viewer__back')).toBeVisible();

  if ((page.viewportSize()?.width ?? 0) >= 768 && scrollState?.reportCanScroll) {
    const positions = await page.evaluate(() => {
      const scroller = document.querySelector<HTMLElement>('.report-viewer__content');
      const filters = document.querySelector<HTMLElement>('app-report-filter-summary');

      if (!scroller || !filters) {
        return null;
      }

      return {
        scrollerTop: scroller.getBoundingClientRect().top,
        filtersTop: filters.getBoundingClientRect().top,
    };
  });

    expect(positions).not.toBeNull();
    expect(Math.abs((positions?.filtersTop ?? 0) - (positions?.scrollerTop ?? 0))).toBeLessThanOrEqual(12);
  }
}

test('report browser and modular report viewer render cleanly', async ({ page }, testInfo) => {
  await page.goto('/reports');
  await expect(page.getByRole('link', { name: /Vendor Scorecard/ })).toBeVisible();
  await expect(page.getByText('Performance reports')).toBeVisible();
  await expect(page.getByText('Archived reports')).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await page.screenshot({
    path: `playwright-report/screenshots/${testInfo.project.name}-reports-root.png`,
    fullPage: true,
  });

  await page.getByText('Performance reports').click();
  await expect(page.getByRole('link', { name: /Lead Time Performance/ })).toBeVisible();
  await expect(page.getByText('No reports found')).toBeHidden();
  await expectNoHorizontalOverflow(page);

  await page.getByRole('link', { name: /Lead Time Performance/ }).click();
  await expect(page.getByRole('tab', { name: 'Overview' })).toBeVisible();
  await expect(page.getByText('Filters')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Report AI' })).toBeVisible();
  await page.getByRole('button', { name: /AI chat/ }).click();
  await expect(page.getByRole('heading', { name: 'Report AI' })).toBeHidden();
  await page.getByRole('button', { name: /AI chat/ }).click();
  await expect(page.getByRole('heading', { name: 'Report AI' })).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await page.screenshot({
    path: `playwright-report/screenshots/${testInfo.project.name}-lead-overview.png`,
    fullPage: true,
  });

  await page.getByRole('tab', { name: 'Trend' }).click();
  await expect(page.locator('canvas')).toBeVisible();
  const chartBox = await page.locator('app-report-trend-chart').boundingBox();
  expect(chartBox?.height ?? 0).toBeGreaterThan(320);
  expect(chartBox?.height ?? 0).toBeLessThan(480);
  await page.screenshot({
    path: `playwright-report/screenshots/${testInfo.project.name}-lead-trend.png`,
    fullPage: true,
  });

  await page.getByRole('tab', { name: 'Details' }).click();
  await expect(page.getByText('Chicago to Denver')).toBeVisible();
  await expect(page.getByText('Late transfer spike detected')).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test('filters change visible report data', async ({ page }) => {
  await page.goto('/reports/vendor-score');
  await expect(page.getByText('91.4')).toBeVisible();

  await page.locator('app-report-filter-summary nz-select').nth(1).click();
  await page.getByText('Watchlist').click();
  await expect(page.getByText('91.4')).toBeHidden();
  await expect(page.getByText('71.3')).toBeVisible();

  await page.getByRole('tab', { name: 'Details' }).click();
  await expect(page.locator('app-report-data-table nz-table')).toBeVisible();
  await expect(page.getByText('Aster Supply Co.')).toBeHidden();
  await expect(page.getByRole('table').getByText('Northline Packaging')).toBeVisible();
  await expectReportContentScrollsInternally(page);

  await page.getByRole('tab', { name: 'Trend' }).click();
  await page.locator('app-report-filter-summary nz-select').first().click();
  await page.getByText('Last 6 months').click();
  await expect(page.locator('canvas')).toBeVisible();
});
