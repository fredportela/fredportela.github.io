import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, catchError, interval, of, startWith, switchMap } from 'rxjs';
import packageJson from '../../../../package.json';

export interface BuildInfo {
  version: string;
  buildId: string;
  builtAt: string;
  timeZone?: string;
}

@Injectable({ providedIn: 'root' })
export class AppVersionService implements OnDestroy {
  private readonly loadedVersion = packageJson.version;
  private readonly subscription: Subscription;
  private loadedBuiltAt: string | null = null;
  private reloading = false;

  readonly buildInfo$ = new BehaviorSubject<BuildInfo | null>(null);

  constructor(private readonly http: HttpClient) {
    this.subscription = interval(60_000).pipe(
      startWith(0),
      switchMap(() => this.fetchBuildInfo())
    ).subscribe(info => {
      if (!info) {
        return;
      }

      const versionChanged = info.version !== this.loadedVersion;
      const buildChanged = this.loadedBuiltAt !== null && info.builtAt !== this.loadedBuiltAt;

      if (this.loadedBuiltAt === null) {
        this.loadedBuiltAt = info.builtAt;
      }

      this.buildInfo$.next(info);

      if ((versionChanged || buildChanged) && !this.reloading) {
        this.reloading = true;
        const updatedUrl = new URL(window.location.href);
        updatedUrl.searchParams.set('app-version', info.version);
        updatedUrl.searchParams.set('app-build', info.builtAt);
        window.location.replace(updatedUrl);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private fetchBuildInfo() {
    return this.http.get<BuildInfo>(`assets/version.json?v=${Date.now()}`).pipe(
      catchError(() => of(null))
    );
  }
}
