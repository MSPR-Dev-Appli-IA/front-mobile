import { Component } from '@angular/core';
import { KeyValue } from '@angular/common';
import { Menu } from '@angular/cdk/menu';
import { ProfileService } from '../profile.service';
import { User } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { Form, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {
  readonly menu: { [key: string]: MenuItem[] } = {
    GENERAL: [
      { name: 'Profile', icon: 'person' },
      { name: 'Notifications', icon: 'notifications' },
      { name: 'Securité', icon: 'lock' },
    ],
    AIDE: [
      { name: 'Tutoriel 1', icon: 'help' },
      { name: 'Tutoriel 2', icon: 'info' },
      { name: 'Tutoriel 3', icon: 'info' },
    ],
  };
  activeMenu = 'Profile';
  user: Observable<User>;
  userDataForm!: FormGroup;
  passwordForm!: FormGroup;
  constructor(private profileService: ProfileService) {
    this.user = profileService.getUser();
  }

  originalOrder = (
    a: KeyValue<string, MenuItem[]>,
    b: KeyValue<string, MenuItem[]>
  ): number => {
    return 0;
  };
}

export interface MenuItem {
  name: string;
  icon: string;
}
