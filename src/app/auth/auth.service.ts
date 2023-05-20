import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, map } from 'rxjs/operators';
import * as moment from 'moment';
import { environment } from '../../environments/environment';
import { baseApiUrl } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<User>(
        environment.apiUrl + 'auth/login',
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        map((res: any) => {
          this.user = {
            ...res,
            imageUrl: '',
            email: res.local.email,
            role: ''
          };
          return this.setSession(res);
        }),
        shareReplay()
      );
  }

  private setSession(authResult: any) {
    //   console.log(authResult);
    //   const expiresAt = moment().add(authResult.expiresIn, 'second');
    //   sessionStorage.setItem('id_token', authResult.idToken);
    //   sessionStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    sessionStorage.removeItem('id_token');
    sessionStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return this.http
      .get<boolean>(environment.apiUrl + 'auth/me', {
        withCredentials: true
      })
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        })
      );
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration ?? '0');
    return moment(expiresAt);
  }

  register(user: any) {
    return this.http
      .post<User>(environment.apiUrl + 'auth/signup', user, {
        withCredentials: true
      })
      .pipe(
        map((res: any) => console.log('test')),
        shareReplay()
      );
  }
}

export interface User {
  id: number;
  rating: number;
  imageUrl: string;
  firstName: string;
  lastName: string;
  role: string;
  username: string;
  email: string;
  password?: string;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}
