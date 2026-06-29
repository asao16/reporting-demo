import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

import { demoFolders, demoReports } from '../../../../demo-data/reporting-demo.data';

@Component({
  selector: 'app-report-list-page',
  standalone: true,
  imports: [FormsModule, RouterLink, NzButtonModule, NzDropDownModule, NzIconModule, NzInputModule],
  templateUrl: './report-list-page.component.html',
  styleUrl: './report-list-page.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportListPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  readonly folders = demoFolders;
  readonly activeFolder = signal<string | null>(null);
  readonly search = signal('');
  readonly activeFolderName = computed(
    () => this.folders.find((folder) => folder.key === this.activeFolder())?.name ?? 'Reports',
  );
  readonly reports = computed(() => {
    const query = this.search().trim().toLowerCase();
    const folderKey = this.activeFolder();
    const scopedReports = demoReports.filter((report) => report.folderKey === folderKey);

    if (!query) {
      return scopedReports;
    }

    return scopedReports.filter(
      (report) =>
        report.name.toLowerCase().includes(query) ||
        report.category.toLowerCase().includes(query) ||
        report.type.toLowerCase().includes(query),
    );
  });

  constructor() {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.activeFolder.set(params.get('folder'));
        this.search.set('');
      });
  }

  openFolder(folderKey: string): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { folder: folderKey },
      queryParamsHandling: 'merge',
    });
  }

  goRoot(): void {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { folder: null },
      queryParamsHandling: 'merge',
    });
  }
}
