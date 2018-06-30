import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortPipe } from './pipes/sort.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { FileExplorerDirective } from './directives/file-explorer.directive';
import { StatusPipe } from './pipes/status.pipe';
import { Main } from './components/main/main.component';
import { RouterModule } from '@angular/router';

const pipes = [SortPipe, JoinPipe, StatusPipe];


@NgModule({
  imports: [
    CommonModule, RouterModule
  ],
  exports: [...pipes, FileExplorerDirective, Main],
  declarations: [...pipes, FileExplorerDirective, Main],
  providers: [...pipes]
})
export class SharedModule { }