import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NowShowingComponent } from './now-showing/now-showing.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MovieResolver } from '../../services/resolver/movie.resolver';
import { ActiveTheatersWithActiveCinemasResolver } from '../../services/resolver/theater.resolver';
import { MovieScheduleComponent } from './movie-schedule/movie-schedule.component';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const materials = [MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule];

@NgModule({
  imports: [
    CommonModule, SharedModule, FormsModule, ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'movie/schedules/:id', component: MovieScheduleComponent, resolve: { movie: MovieResolver, theaters: ActiveTheatersWithActiveCinemasResolver } }      
    ]),
    ...materials
  ],
  exports: [NowShowingComponent],
  declarations: [NowShowingComponent, MovieScheduleComponent]
})
export class MovieModule { }