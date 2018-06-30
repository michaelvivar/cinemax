import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RemoveUser } from '@stores/actions/app.actions';

@Component({
  selector: 'user-button',
  templateUrl: './user-menu.component.html',
  styles: []
})
export class UserMenuComponent implements OnInit {

  constructor(
    private userService: UserService,
    private store: Store,
    private router: Router
  ) { }

  @Select(store => store.app.user) user: Observable<any>;
  user$: Observable<any>;
  btnDisplay = false;
  isAdmin = false;

  ngOnInit() {
    this.user$ = this.user.pipe(map(user => {
      if (user) {
        const username = user.name || user.email;
        return { id: user.id, username }
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