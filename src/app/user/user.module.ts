import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserService } from './services/user.service';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatMenuModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserButtonComponent } from './logout/user-button.component';

const materials = [MatFormFieldModule, MatInputModule, MatButtonModule, MatMenuModule];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, ...materials
  ],
  exports: [UserButtonComponent],
  declarations: [LoginFormComponent, UserButtonComponent],
  providers: [UserService],
  entryComponents: [LoginFormComponent]
})
export class UserModule { }