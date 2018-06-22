import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyMovieComponent } from './buy-movie/buy-movie.component';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

const materials = [MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, SharedModule,
    RouterModule.forChild([
      
    ]),
    ...materials
  ],
  declarations: [BuyMovieComponent],
})
export class BuyModule { }