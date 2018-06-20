import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.firebaseAuth.authState.pipe(map(user => {
      return user ? true : false;
    })).pipe(tap(user => {
      if (!user) {
        this.router.navigate(['/']);
      }
    }))
  }
}
