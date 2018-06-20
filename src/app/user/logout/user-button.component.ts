import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserService } from '../services/user.service';
import { RemoveUser, SetUser } from '../../ngxs/actions/app.actions';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { LoginFormComponent } from '../login-form/login-form.component';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'user-button',
  templateUrl: './user-button.component.html',
  styles: []
})
export class UserButtonComponent implements OnInit {

  constructor(private firebaseAuth: AngularFireAuth, private userService: UserService, private store: Store, private dialog: MatDialog) { }

  user$: Observable<any>;
  btnDisplay = false;

  ngOnInit() {
    this.user$ = this.firebaseAuth.authState.pipe(map(user => {
      if (user) {
        return user.displayName || user.email;
      }
    })).pipe(tap(user => {
      this.btnDisplay = true;
    }))
  }

  login() {
    this.dialog.open(LoginFormComponent, {
      width: '400px'
    })
  }

  logout() {
    this.userService.logout().then(() => {
      this.store.dispatch(new RemoveUser());
    })
  }
}