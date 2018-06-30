import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { debounceTime } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styles: []
})
export class SignupFormComponent implements OnInit {

  constructor(
    private formBuild: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<SignupFormComponent>
  ) { }

  signupForm: FormGroup;
  submitted = false;

  ngOnInit() {
    this.signupForm = this.formBuild.group({
      username: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirm: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
    this.signupForm.valueChanges
    .pipe(debounceTime(500))
    .subscribe(() => {
      this.validate();
    })
  }

  validate() {
    if (!this.signupForm.get('password').errors) {
      if ((<string>this.signupForm.get('confirm').value || '').length >= 6) {
        if (this.signupForm.get('password').value != this.signupForm.get('confirm').value) {
          this.signupForm.get('confirm').setErrors({ notMatch: true });
        }
      }
    }
  }

  submit() {
    this.submitted = true;
    this.userService.signUpRegular(this.signupForm.get('username').value, this.signupForm.get('password').value).then(value => {
      this.userService.addUser(value);
      this.dialogRef.close();
    }).catch(error => {
      if (error.code == 'auth/email-already-in-use') {
        this.signupForm.get('username').setErrors({ exists: true });
      }
      //"auth/weak-password"
      this.submitted = false;
    })
  }
}