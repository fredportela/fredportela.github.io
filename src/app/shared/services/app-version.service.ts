import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, catchError, interval, of, startWith, switchMap } from 'rxjs';
import packageJson from '../../../../package.json';

export interface BuildInfo {
  version: string;
  buildId: string;
  builtAt: string;
}

@Injectable({ providedIn: 'root' })
export class AppVersionService implements OnDestroy {
  private readonly loadedVersion = packageJson.version;
  private readonly subscription: Subscription;
  private reloading = false;

  readonly buildInfo$ = new BehaviorSubject<BuildInfo>({
    version: this.loadedVersion,
    buildId: 'local',
    builtAt: new Date().toISOString()
  });

  constructor(private readonly http: HttpClient) {
    this.subscription = interval(60_000).pipe(
      startWith(0),
      switchMap(() => this.fetchBuildInfo())
    ).subscribe(info => {
      if (!info) {
        return;
      }

      this.buildInfo$.next(info);

      if (info.version !== this.loadedVersion && !this.reloading) {
        this.reloading = true;
        const updatedUrl = new URL(window.location.href);
        updatedUrl.searchParams.set('app-version', info.version);
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
