import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<User>('/api/login', { email, password }).pipe(
      map((res: any) => this.setSession(res)),
      shareReplay()
    );
    // this is just the HTTP call,
    // we still need to handle the reception of the token
  }

  private setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration ?? '0');
    return moment(expiresAt);
  }
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: Role;
  username: string;
  email: string;
  password: string;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
