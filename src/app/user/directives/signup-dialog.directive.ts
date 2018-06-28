import { Directive, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SignupFormComponent } from '../signup-form/signup-form.component';

@Directive({
  selector: '[signupDialog]'
})
export class SignupDialogDirective {

  constructor(private dialog: MatDialog) { }

  @HostListener('click') open() {
    this.dialog.open(SignupFormComponent, {
      width: '400px'
    })
  }
}
