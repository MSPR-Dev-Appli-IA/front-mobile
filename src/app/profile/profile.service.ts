import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../auth/auth.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getUser() {
    return of({
      id: 1,
      imageUrl: 'assets/img/mock/plant.png',
      rating: 2,
      firstName: 'John',
      lastName: 'Doe',
      role: 'USER',
      username: 'johndoe',
      email: 'test@gmail.com'
    } as User);
    // return this.http.get<User>('/api/user');
  }

  changeUserData(user: User) {
    return this.http.post('/api/user/change-data', {
      user
    });
  }

  changePassword(oldPassword: string, newPassword: string) {
    return this.http.post('/api/user/change-password', {
      oldPassword,
      newPassword
    });
  }
}
