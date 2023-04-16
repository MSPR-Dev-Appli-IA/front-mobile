import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from "@angular/cdk/layout";
import { map, Observable } from "rxjs";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isMobile$: Observable<boolean>;
  constructor(private responsive: BreakpointObserver) {
    this.isMobile$ = this.responsive.observe(Breakpoints.HandsetPortrait).pipe(
        map(
            result => result.matches ? true : false
        )
    );
  }
}
