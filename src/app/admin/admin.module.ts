import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MovieTableComponent } from './movie/movie-table/movie-table.component';
import { MovieDetailsComponent } from './movie/movie-details/movie-details.component';
import { MovieFormComponent } from './movie/movie-form/movie-form.component';

import { CinemaTableComponent } from './cinema/cinema-table/cinema-table.component';
import { CinemaDetailsComponent } from './cinema/cinema-details/cinema-details.component';
import { CinemaFormComponent } from './cinema/cinema-form/cinema-form.component';

import { TheaterDetailsComponent } from './theater/theater-details/theater-details.component';
import { TheaterFormComponent } from './theater/theater-form/theater-form.component';
import { TheaterTableComponent } from './theater/theater-table/theater-table.component';

import { SeatLayoutComponent } from './cinema/seat-layout/seat-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ScheduleFormComponent } from './schedule/schedule-form/schedule-form.component';

import { TheaterResolver, TheatersResolver, TheaterWithCinemasResolver, TheatersWithCinemasResolver, ActiveTheatersWithActiveCinemasResolver } from '../services/resolver/theater.resolver';
import { ConfirmExitGuard } from '../guards/confirm-exit.guard';

import { MatDialogModule, MatCardModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatIconModule, MatTableModule, MatPaginatorModule, MatDividerModule, MatListModule, MatChipsModule, MatGridListModule, MatProgressBarModule, MatProgressSpinnerModule, MatCheckboxModule, MatRadioModule } from '@angular/material';
import { ScheduleTableComponent } from './schedule/schedule-table/schedule-table.component';
import { SchedulesComponent } from './schedule/schedules/schedules.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '@guards/auth.guard';
import { ActiveMoviesResolver, MoviesResolver, MovieResolver } from '@services/resolver/movie.resolver';
import { CinemaResolver } from '@services/resolver/cinema.resolver';
import { Main } from '../shared/components/main/main.component';

const materials = [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule,
                  MatNativeDateModule, MatSelectModule, MatIconModule, MatTableModule, MatPaginatorModule,
                MatDividerModule, MatCardModule, MatListModule, MatChipsModule, MatGridListModule,
                MatProgressBarModule, MatProgressSpinnerModule, MatCheckboxModule];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, SharedModule,
    RouterModule.forChild([
      { path: '**', component: Main, children: [
        { path: 'schedules', component: SchedulesComponent, resolve: {
          theaters: TheatersWithCinemasResolver
        }},
        { path: 'schedule', children: [
          { path: 'movie/:id', component: ScheduleFormComponent, resolve: { theaters: ActiveTheatersWithActiveCinemasResolver, movie: MovieResolver }, canActivate: [AuthGuard] }
        ]},
        { path: 'movies', component: MovieTableComponent, resolve: { movies: MoviesResolver}, canActivate: [AuthGuard] },
        { path: 'movie', children: [
          { path: 'add', component: MovieFormComponent, canActivate: [AuthGuard], canDeactivate: [ConfirmExitGuard] },
          { path: 'edit/:id', component: MovieFormComponent, canDeactivate: [ConfirmExitGuard], resolve: { movie: MovieResolver }, canActivate: [AuthGuard] },
          { path: ':id', component: MovieDetailsComponent, resolve: { movie: MovieResolver }, canActivate: [AuthGuard] },
        ]},
        { path: 'cinema', children: [
          { path: 'edit/:theater/:cinema', component: CinemaFormComponent, resolve: { cinema: CinemaResolver}, canDeactivate: [ConfirmExitGuard], canActivate: [AuthGuard] },
          { path: 'add/:theater', component: CinemaFormComponent, canActivate: [AuthGuard], canDeactivate: [ConfirmExitGuard] },
          { path: ':theater/:cinema', component: CinemaDetailsComponent, resolve: { cinema: CinemaResolver, theater: TheaterResolver }, canActivate: [AuthGuard] }
        ]},
        { path: 'theaters', component: TheaterTableComponent, resolve: { theaters: TheatersResolver }, canActivate: [AuthGuard] },
        { path: 'theater', children: [
          { path: 'add', component: TheaterFormComponent, canActivate: [AuthGuard], canDeactivate: [ConfirmExitGuard] },
          { path: 'edit/:id', component: TheaterFormComponent, resolve: { theater: TheaterResolver }, canActivate: [AuthGuard], canDeactivate: [ConfirmExitGuard] },
          { path: ':id', component: TheaterDetailsComponent, resolve: { theater: TheaterWithCinemasResolver}, canActivate: [AuthGuard] }
        ]},
        { path: '**', component: DashboardComponent, resolve: { movies: ActiveMoviesResolver }, canActivate: [AuthGuard] },
      ]}
    ]),
    ...materials
  ],
  declarations: [MovieTableComponent, MovieDetailsComponent, MovieFormComponent, CinemaFormComponent, TheaterDetailsComponent, TheaterFormComponent, TheaterTableComponent, CinemaTableComponent, CinemaDetailsComponent, SeatLayoutComponent, DashboardComponent, ScheduleFormComponent, ScheduleTableComponent, SchedulesComponent],
})
export class AdminModule {}
