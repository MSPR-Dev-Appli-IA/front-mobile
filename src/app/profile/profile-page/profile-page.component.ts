import { Component, OnDestroy } from '@angular/core';
import { KeyValue } from '@angular/common';
import { ProfileService } from '../profile.service';
import { User } from '../../auth/auth.service';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnDestroy {
  readonly menu: { [key: string]: MenuItem[] } = {
    GENERAL: [
      { name: 'Profile', icon: 'person' },
      { name: 'Notifications', icon: 'notifications' },
      { name: 'Securité', icon: 'lock' }
    ],
    AIDE: [
      { name: 'Tutoriel 1', icon: 'help' },
      { name: 'Tutoriel 2', icon: 'info' },
      { name: 'Tutoriel 3', icon: 'info' }
    ]
  };
  activeMenu = 'Profile';
  user: Observable<User>;
  userDataForm!: FormGroup;
  passwordForm!: FormGroup;
  sub = new Subscription();

  constructor(private profileService: ProfileService, private fb: FormBuilder) {
    this.user = profileService.getUser();
    this.userDataForm = this.fb.group({
      username: ['', Validators.pattern(/^[a-zA-Z0-9_-]+$/)],
      email: ['', Validators.email]
    });
    this.passwordForm = this.fb.group({
      password: ['', [Validators.minLength(8)]],
      passwordVerify: ['']
    });

    this.sub.add(
      this.user.subscribe(user => {
        this.userDataForm.setValue({
          username: user.username,
          email: user.email
        });
      })
    );
  }

  saveUserData() {
    console.log('saveUserData');
  }

  savePassword() {
    console.log('savePassword');
  }

  originalOrder = (
    a: KeyValue<string, MenuItem[]>,
    b: KeyValue<string, MenuItem[]>
  ): number => {
    return 0;
  };

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

export interface MenuItem {
  name: string;
  icon: string;
}
