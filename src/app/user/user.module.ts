import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserService } from './services/user.service';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatMenuModule, MatDividerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { RouterModule } from '@angular/router';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { SignupButtonComponent } from './signup-button/signup-button.component';

const materials = [MatFormFieldModule, MatInputModule, MatButtonModule, MatMenuModule, MatDividerModule];

@NgModule({
  imports: [
    CommonModule, RouterModule, FormsModule, ReactiveFormsModule, ...materials
  ],
  exports: [UserMenuComponent, LoginButtonComponent, SignupButtonComponent],
  declarations: [LoginFormComponent, UserMenuComponent, SignupFormComponent, LoginButtonComponent, SignupButtonComponent],
  providers: [UserService],
  entryComponents: [LoginFormComponent, SignupFormComponent]
})
export class UserModule { }