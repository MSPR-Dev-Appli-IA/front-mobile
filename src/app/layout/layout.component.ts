import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from "@angular/cdk/layout";
import { map, Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isMobile$: Observable<boolean>;
  path = 'map'

  constructor(private responsive: BreakpointObserver, private router: Router, private route: ActivatedRoute) {
    this.isMobile$ = this.responsive.observe(Breakpoints.HandsetPortrait).pipe(
        map(
            result => result.matches ? true : false
        )
    );
  }

  navigate(path: string): void {
    this.path = path;
    this.router.navigate([path], { relativeTo: this.route });
  }
}
