import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, User } from '../auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      username: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]+$/)]
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordVerify: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register() {
    this.authService
      .register({
        email: this.form.value.email,
        firstname: this.form.value.firstname,
        lastname: this.form.value.lastname,
        password: this.form.value.password,
        username: this.form.value.username
      })
      .subscribe(res => {
        console.log(res);
      });
  }
}
