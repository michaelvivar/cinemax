import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
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
    public dialogRef: MatDialogRef<LoginFormComponent>
  ) { }

  loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = this.formBuild.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  submitted = false;

  submit() {
    this.submitted = true;
    this.userService.signInRegular(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).then(value => {
      this.dialogRef.close();
      //this.router.navigate(['/']);
    })
    .catch(error => {
      if (error.code == 'auth/wrong-password') {
        this.loginForm.get('password').reset();
        this.loginForm.setErrors({ failed: true });
        this.submitted = false;
      }
    })
  }

  signInWithTwitter() {
    this.userService.signInWithTwitter()
    .then((res) => {
        this.dialogRef.close();
        this.userService.addUser(res);
        //this.router.navigate(['/'])
      })
    .catch((err) => console.log(err));
  }

  signInWithFacebook() {
    this.userService.signInWithFacebook()
    .then((res) => { 
        this.dialogRef.close();
        this.userService.addUser(res);
        //this.router.navigate(['/'])
      })
    .catch((err) => console.log(err));
  }

  signInWithGoogle() {
    this.userService.signInWithGoogle()
    .then((res) => { 
        this.dialogRef.close();
        this.userService.addUser(res);
        //this.router.navigate(['/'])
      })
    .catch((err) => console.log(err));
  }
}
