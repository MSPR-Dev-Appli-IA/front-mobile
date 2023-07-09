import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, map } from 'rxjs/operators';
import * as moment from 'moment';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User = {
    rating: 4,
    imageUrl: '',
    firstName: '',
    lastName: '',
    role: '',
    username: '',
    email: ''
  };
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http
      .post<User>(
        environment.apiUrl + 'auth/login',
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        map((res: any) => {
          console.log(res);
          if ('jwt' in res && res.jwt !== '') {
            this.router.navigate(['/']);
            return this.setSession(res);
          } else {
            return new Error('Invalid credentials');
          }
        }),
        shareReplay()
      );
  }

  private setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    sessionStorage.setItem('id_token', authResult.jwt);
    sessionStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    sessionStorage.removeItem('id_token');
    sessionStorage.removeItem('expires_at');
  }

  public isLoggedIn(): Observable<boolean> {
    return this.http
      .get<boolean>(environment.apiUrl + 'auth/me', {
        headers: {
          Authorization: 'Bearer ' + this.getToken()
        },
        withCredentials: true
      })
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        })
      );
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration ?? '0');
    return moment(expiresAt);
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  register(user: any) {
    return this.http
      .post<User>(environment.apiUrl + 'auth/register', user, {
        withCredentials: true
      })
      .pipe(
        map((res: any) => console.log('test')),
        shareReplay()
      );
  }
}

export interface User {
  rating: number;
  imageUrl: string;
  firstName: string;
  lastName: string;
  role: string;
  username: string;
  email: string;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}
