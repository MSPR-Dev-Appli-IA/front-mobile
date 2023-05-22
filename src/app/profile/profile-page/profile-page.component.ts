import { Component } from '@angular/core';
import { KeyValue } from '@angular/common';
import { first, Observable } from 'rxjs';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { LayoutService } from '../../layout/layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  readonly menu: { [key: string]: MenuItem[] } = {
    GENERAL: [
      { name: 'Profile', icon: 'person', link: 'general' },
      { name: 'Notifications', icon: 'notifications', link: 'notifications' },
      { name: 'Securité', icon: 'lock', link: 'security' }
    ],
    AIDE: [
      { name: 'Tutoriel 1', icon: 'help', link: 'tuto-1' },
      { name: 'Tutoriel 2', icon: 'info', link: 'tuto-2' },
      { name: 'Tutoriel 3', icon: 'info', link: 'tuto-3' }
    ]
  };
  activeMenu = 'Profile';
  isMobile$: Observable<boolean>;

  constructor(private layoutService: LayoutService, private router: Router) {
    this.isMobile$ = this.layoutService.isMobile$;

    this.isMobile$.pipe(first()).subscribe((isMobile: boolean) => {
      if (!isMobile) {
        this.router.navigate(['profile/general']);
      }
    });
  }

  originalOrder = (
    a: KeyValue<string, MenuItem[]>,
    b: KeyValue<string, MenuItem[]>
  ): number => {
    return 0;
  };

  setNavigationContext(): void {
    this.layoutService.setMobileNavigationContext('profile');
  }
}

export interface MenuItem {
  name: string;
  icon: string;
  link: string;
}
