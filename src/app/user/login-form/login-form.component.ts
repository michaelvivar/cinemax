import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Store } from '@ngxs/store';
import { SetUser } from '../../ngxs/actions/app.actions';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styles: ['.action-buttons .mat-raised-button { font-size: 10px; font-weight: 400; padding: 0 10px; line-height: 30px }']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private formBuild: FormBuilder,
    private userService: UserService,
    private router: Router,
    private store: Store,
    public dialogRef: MatDialogRef<LoginFormComponent>
  ) { }

  loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = this.formBuild.group({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  submitted = false;

  submit() {
    this.submitted = true;
    this.userService.signInRegular(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).then(value => {
      this.store.dispatch(new SetUser(value));
      this.dialogRef.close();
      this.router.navigate(['/']);
    });
  }

  signInWithTwitter() {
    this.userService.signInWithTwitter()
    .then((res) => { 
        this.router.navigate(['/'])
      })
    .catch((err) => console.log(err));
  }

  signInWithFacebook() {
    this.userService.signInWithFacebook()
    .then((res) => { 
        this.router.navigate(['/'])
      })
    .catch((err) => console.log(err));
  }

  signInWithGoogle() {
    this.userService.signInWithGoogle()
    .then((res) => { 
        this.router.navigate(['/'])
      })
    .catch((err) => console.log(err));
  }
}
