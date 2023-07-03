import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  isMobile$: Observable<boolean>;
  isBackArrowVisible: BehaviorSubject<boolean> = new BehaviorSubject(false);
  path: string[] = [];

  constructor(private router: Router, private responsive: BreakpointObserver) {
    this.isMobile$ = this.responsive
      .observe(Breakpoints.HandsetPortrait)
      .pipe(map((result: BreakpointState): boolean => result.matches));
  }

  setMobileNavigationContext(path: string) {
    this.showBackArrow();
    this.path.push(path);
  }

  resetMobileNavigationContext() {
    this.hideBackArrow();
    this.path = [];
  }

  goBack(): void {
    this.router.navigate([...this.path]);
    if (this.path.length < 2) {
      this.path = [];
      this.hideBackArrow();
    } else {
      this.path = this.path.slice(0, -1);
    }
  }

  showBackArrow(): void {
    this.isBackArrowVisible.next(true);
  }

  hideBackArrow(): void {
    this.isBackArrowVisible.next(false);
  }
}
