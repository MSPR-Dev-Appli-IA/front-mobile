import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../auth/auth.service';
import { ProfileService } from '../profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnDestroy {
  user: Observable<User>;
  userDataForm!: FormGroup;
  passwordForm!: FormGroup;
  sub = new Subscription();
  isMobile$: Observable<boolean>;

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private responsive: BreakpointObserver
  ) {
    this.user = profileService.getUser();
    this.isMobile$ = this.responsive
      .observe(Breakpoints.HandsetPortrait)
      .pipe(map((result: BreakpointState): boolean => result.matches));

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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
