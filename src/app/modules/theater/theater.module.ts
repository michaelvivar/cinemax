import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule, MatDividerModule, MatCardModule } from '@angular/material';
import { TheaterListComponent } from './components/theater-list/theater-list.component';
import { CinemaScheduleComponent } from './components/cinema-schedule/cinema-schedule.component';
import { TheaterCinemasComponent } from './components/theater-cinemas/theater-cinemas.component';

const materials = [MatListModule, MatDividerModule, MatCardModule];

@NgModule({
  imports: [
    CommonModule, RouterModule, ...materials
  ],
  exports: [TheaterListComponent, TheaterCinemasComponent],
  declarations: [TheaterListComponent, CinemaScheduleComponent, TheaterCinemasComponent]
})
export class TheaterModule { }