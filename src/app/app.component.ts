import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Store } from '@ngxs/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { SetUser } from './ngxs/actions/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(router: Router, store: Store, firebaseAuth: AngularFireAuth) {
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
    firebaseAuth.authState.subscribe((data: any) => {
      if (data) {
        store.dispatch(new SetUser(data));
      }
    });
  }

  progress: number = 0;

  title = 'app';
}