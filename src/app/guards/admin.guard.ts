import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, tap, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private firestore: AngularFirestore, private firebaseAuth: AngularFireAuth, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.firebaseAuth.authState.pipe(map(user => {
      if (user) {
        return user.uid;
      }
      return null;
    }))
    .pipe(switchMap(id => {
      if (id) {
        return this.firestore.collection('users').doc(id).snapshotChanges().pipe(map(user => {
          return user.payload.get('type') == 'admin';
        }))
      }
      else {
        return of(false);
      }
    }))
    .pipe(tap(admin => {
      if (!admin) {
        this.router.navigate(['/']);
      }
    }))
  }
}
