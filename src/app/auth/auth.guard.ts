import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // this.authService.isLoggedIn().subscribe(res => {
    //   console.log(res);
    // });

    // if (isLoggedIn) {
    //   return true;
    // } else {
    //   this.router.navigate(['/auth']);
    // }

    return true;
  }
}
