import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortPipe } from './pipes/sort.pipe';
import { JoinPipe } from './pipes/join.pipe';

const pipes = [SortPipe, JoinPipe];


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [...pipes],
  declarations: [...pipes],
  providers: [...pipes]
})
export class SharedModule { }