import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'login-button',
  templateUrl: './login-button.component.html',
  styles: []
})
export class LoginButtonComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  login() {
    this.dialog.open(LoginFormComponent, {
      width: '400px'
    })
  }
}
