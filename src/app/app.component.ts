import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Store } from '@ngxs/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { switchMap, map } from 'rxjs/operators';
import { RemoveMovie } from '@stores/actions/movie.actions';
import { RemoveCinema } from '@stores/actions/cinema.actions';
import { RemoveTheater } from '@stores/actions/theater.actions';
import { SetUser } from '@stores/actions/app.actions';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent {

   constructor(router: Router, store: Store, firebaseAuth: AngularFireAuth) {

      //  store.dispatch(new RemoveMovie());
      //  store.dispatch(new RemoveCinema());
      //  store.dispatch(new RemoveTheater());

      router.events.subscribe((event: Event) => {
         if (event instanceof NavigationStart) {
            this.progress = 5;
         }
         else if (event instanceof NavigationEnd) {
            this.progress = 100;
         }
         else if (event instanceof NavigationCancel) {
            this.progress = 100;
         }
         else if (event instanceof NavigationError) {
            router.navigate(['error']);
         }
      })

      firebaseAuth.idToken.pipe(switchMap(token => {
         return firebaseAuth.authState.pipe(map(user => {
            if (user) {
               return { token, email: user.email, id: user.uid, name: user.displayName };
            }
            return null;
         }))
      }))
         .subscribe(data => {
            if (data) {
               store.dispatch(new SetUser(data));
            }
         })
   }

   progress: number = 0;
}