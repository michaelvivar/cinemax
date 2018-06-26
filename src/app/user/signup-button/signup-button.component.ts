import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SignupFormComponent } from '../signup-form/signup-form.component';

@Component({
  selector: 'signup-button',
  templateUrl: './signup-button.component.html',
  styles: []
})
export class SignupButtonComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  signup() {
    this.dialog.open(SignupFormComponent, {
      width: '400px'
    })
  }

}
