import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isMobile$: Observable<boolean>;
  path = '';
  isBackArrowVisible: BehaviorSubject<boolean>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private layoutService: LayoutService
  ) {
    this.isMobile$ = this.layoutService.isMobile$;
    this.isBackArrowVisible = this.layoutService.isBackArrowVisible;
  }

  navigate(path: string): void {
    this.path = path;
    this.router.navigate([path]);
    this.layoutService.resetMobileNavigationContext();
  }

  goBack(): void {
    this.layoutService.goBack();
    this.layoutService.hideBackArrow();
  }
}
