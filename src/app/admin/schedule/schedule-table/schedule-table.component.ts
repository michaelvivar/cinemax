import { Component, OnInit, Input } from '@angular/core';
import { TableBaseComponent } from '../../../utils/base.component';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Theater } from '../../../models/theater.model';
import { Cinema } from '../../../models/cinema.model';
import { ScheduleService } from '../../../services/schedule.service';
import { MatTableDataSource } from '@angular/material';
import { RemoveTheater } from '../../../ngxs/actions/theater.actions';
import { RemoveCinema } from '../../../ngxs/actions/cinema.actions';
import { RemoveMovie } from '../../../ngxs/actions/movie.actions';
import { Schedule } from '../../../models/schedule.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'schedule-table',
  templateUrl: './schedule-table.component.html',
  styles: []
})
export class ScheduleTableComponent extends TableBaseComponent implements OnInit {

  constructor(
    private service: ScheduleService,
    private route: ActivatedRoute
  ) { super() }

  @Input('movie') movieId: any;
  @Select(store => store.theater) theater$: Observable<Theater>;
  @Select(store => store.cinema) cinema$: Observable<Cinema>;
  theaters: Theater[] = [];
  theaterId: any;
  cinemaId: any;

  filter(data: Schedule, filter: string) {
    const value: { theater: string, cinema: string } = <any>filter;
    if (value.theater) {
      if (data.theater['id'] != value.theater) {
        return false;
      }
      if (value.cinema) {
        if (data.cinema['id'] != value.cinema) {
          return false;
        }
      }
    }
    return true;
  }

  ngOnInit() {
    this.theaters = this.route.snapshot.data['theaters'];
    this.columns = ['cinema', 'date', 'time', 'price', 'delete'];

    this.subscription = this.service.getByMovie(this.movieId).subscribe(async (data) => {
      if (data) {
        await data.forEach(o => {
          const theater = this.theaters.find(t => t.id == o.theater);
          if (theater) {
            if (theater.cinemas && theater.cinemas.length > 0) {
              o.cinema = theater.cinemas.find(c => c.id == o.cinema);
            }
            o.theater = { id: theater.id, name: theater.name };
          }
        });
        const schedules = await data.sort(this.sortBy('date'));
        this.data = new MatTableDataSource(this.filterByDate(schedules));
        this.data.filterPredicate = this.filter;
        this.data.filter = <any>{ theater: this.theaterId, cinema: this.cinemaId };
      }
    });

    this.subscription = this.theater$.subscribe((theater) => {
      if (theater) {
        this.theaterId = theater.id;
        this.data.filter = <any>{theater: theater.id, cinema: null};
      }
    });

    this.subscription = this.cinema$.subscribe((cinema) => {
      if (cinema) {
        this.cinemaId = cinema.id;
        this.data.filter = <any>{theater: this.theaterId, cinema: cinema.id};
      }
    })
  }

  delete(sched: Schedule) {
    this.confirm(
      `<div class="row">
      <div class="col-md-3">Movie:</div><div class="col-md-9">${sched.movie.title}</div>
      <div class="col-md-3">Cinema:</div><div class="col-md-9">${sched.theater.name} - ${sched.cinema.name}</div>
      <div class="col-md-3">Date:</div><div class="col-md-9">${sched.date.toDateString()}</div>
      <div class="col-md-3">Time:</div><div class="col-md-9">${sched.time.start} - ${sched.time.end}</div>
      </div>`, 'Delete!'
    ).then(value => {
      if (value) {
        this.service.delete(sched.id);
      }
    })
  }

  filterByDate(data: Schedule[]) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0);
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 23, 59);
    return data.filter(o => o.date > today).filter(o => o.date < tomorrow);
  }

  ngOnDestroy() {
    this.store.dispatch(new RemoveTheater());
    this.store.dispatch(new RemoveCinema());
    this.store.dispatch(new RemoveMovie());
    super.ngOnDestroy();
  }
}
