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
  previousPath: string[] = [];

  constructor(private router: Router, private responsive: BreakpointObserver) {
    this.isMobile$ = this.responsive
      .observe(Breakpoints.HandsetPortrait)
      .pipe(map((result: BreakpointState): boolean => result.matches));
  }

  setMobileNavigationContext(path: string) {
    this.showBackArrow();
    this.previousPath.push(path);
  }

  goBack(): void {
    this.hideBackArrow();
    this.router.navigate([this.previousPath.pop()]);
  }

  showBackArrow(): void {
    this.isBackArrowVisible.next(true);
  }

  hideBackArrow(): void {
    this.isBackArrowVisible.next(false);
  }
}
