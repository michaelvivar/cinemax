import { Directive, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginFormComponent } from '../login-form/login-form.component';

@Directive({
  selector: '[loginDialog]'
})
export class LoginDialogDirective {

  constructor(private dialog: MatDialog) { }

  @HostListener('click') open() {
    this.dialog.open(LoginFormComponent, {
      width: '400px'
    })
  }
}
