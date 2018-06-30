import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NowShowingComponent } from './now-showing/now-showing.component';
import { RouterModule } from '@angular/router';
import { MovieScheduleComponent } from './movie-schedule/movie-schedule.component';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDialogModule, MatListModule, MatDividerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieInfoDialogComponent } from './components/movie-info-dialog/movie-info-dialog.component';
import { MovieInfoDialogDirective } from './directives/movie-info-dialog.directive';
import { MovieVideoComponent } from './components/movie-video/movie-video.component';
import { SharedModule } from '../../shared/shared.module';
import { MovieResolver } from '@services/resolver/movie.resolver';
import { ActiveTheatersWithActiveCinemasResolver } from '@services/resolver/theater.resolver';

const materials = [MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,
MatDialogModule, MatListModule, MatDividerModule];

@NgModule({
  imports: [
    CommonModule, SharedModule, FormsModule, ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'movie/schedules/:id', component: MovieScheduleComponent, resolve: { movie: MovieResolver, theaters: ActiveTheatersWithActiveCinemasResolver } }      
    ]),
    ...materials
  ],
  exports: [NowShowingComponent, MovieInfoDialogDirective],
  declarations: [NowShowingComponent, MovieScheduleComponent, MovieInfoDialogComponent, MovieInfoDialogDirective, MovieVideoComponent],
  entryComponents: [MovieInfoDialogComponent]
})
export class MovieModule { }