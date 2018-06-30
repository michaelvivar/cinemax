import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { MatDialog } from '@angular/material';
import { ConfirmDialog } from '@components/confirm-dialog/confirm-dialog.component';
import { RemovePageConfirmExit } from '@stores/actions/app.actions';

@Injectable({
  providedIn: 'root'
})
export class ConfirmExitGuard implements CanDeactivate<any> {

  constructor(private dialog: MatDialog, private store: Store) {}

  @Select(store => store.app.page.exit) exit$: Observable<any>;

  canDeactivate(): Observable<boolean> {
    let message: string;
    return this.exit$.pipe(map(data => {
      message = data.message;
      return data.confirm;
    })).pipe(switchMap(data => {
      if (data) {
        return this.dialog.open(ConfirmDialog, {
          width: '250px',
          data: message
        }).afterClosed().pipe(tap(value => {
          if (value == true) {
            this.store.dispatch(new RemovePageConfirmExit());
          }
        }))
      }
      return of(true);
    }))
  }
}