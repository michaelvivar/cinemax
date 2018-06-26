import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserService } from '../services/user.service';
import { RemoveUser, SetUser } from '../../ngxs/actions/app.actions';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { LoginFormComponent } from '../login-form/login-form.component';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'user-button',
  templateUrl: './user-menu.component.html',
  styles: []
})
export class UserMenuComponent implements OnInit {

  constructor(
    private firebaseAuth: AngularFireAuth,
    private userService: UserService,
    private store: Store,
    private router: Router
  ) { }

  user$: Observable<any>;
  btnDisplay = false;
  isAdmin = false;

  ngOnInit() {
    this.user$ = this.firebaseAuth.authState.pipe(map(user => {
      if (user) {
        const username = user.displayName || user.email;
        return { id: user.uid, username }
      }
    })).pipe(tap(user => {
      if(user) {
        this.userService.get(user.id).then(data => {
          this.isAdmin = data.get('type') == 'admin';
        })
      }
      this.btnDisplay = true;
    }))
  }

  logout() {
    this.userService.logout().then(() => {
      this.store.dispatch(new RemoveUser());
      this.router.navigate(['/']);
    })
  }
}