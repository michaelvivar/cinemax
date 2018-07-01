import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule, MatDividerModule, MatCardModule, MatDialogModule } from '@angular/material';
import { TheaterListComponent } from './components/theater-list/theater-list.component';
import { CinemaScheduleComponent } from './components/cinema-schedule/cinema-schedule.component';
import { TheaterCinemasComponent } from './components/theater-cinemas/theater-cinemas.component';
import { SchedDialogDirective } from '@modules/theater/directives/sched-dialog.directive';
import { ScheduleDialogComponent } from './components/schedule-dialog/schedule-dialog.component';
import { SharedModule } from '../../shared/shared.module';

const materials = [MatListModule, MatDividerModule, MatCardModule, MatDialogModule];

@NgModule({
   imports: [
      CommonModule, RouterModule, SharedModule, ...materials
   ],
   exports: [TheaterListComponent, TheaterCinemasComponent],
   declarations: [TheaterListComponent, CinemaScheduleComponent, TheaterCinemasComponent, SchedDialogDirective, ScheduleDialogComponent],
   entryComponents: [ScheduleDialogComponent]
})
export class TheaterModule { }