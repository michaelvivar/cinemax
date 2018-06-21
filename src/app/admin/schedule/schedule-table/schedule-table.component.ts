import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { TableBaseComponent } from '../../../utils/base.component';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Theater } from '../../../models/theater.model';
import { Cinema } from '../../../models/cinema.model';
import { ScheduleService } from '../../../services/schedule.service';
import { Schedule } from '../../../models/schedule.model';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { RemoveTheater } from '../../../ngxs/actions/theater.actions';
import { RemoveCinema } from '../../../ngxs/actions/cinema.actions';
import { RemoveMovie } from '../../../ngxs/actions/movie.actions';

@Component({
  selector: 'schedule-table',
  templateUrl: './schedule-table.component.html',
  styles: []
})
export class ScheduleTableComponent extends TableBaseComponent implements OnInit {

  constructor(
    private service: ScheduleService,
    private store: Store,
    dialog: MatDialog, domSanitizer: DomSanitizer
  ) { super(dialog, domSanitizer) }

  @Input('movie') movieId: any;
  @Select(store => store.theater) theater$: Observable<Theater>;
  @Select(store => store.cinema) cinema$: Observable<Cinema>;
  schedules: Schedule[] = [];
  filtered: Schedule[] = [];
  theaterId: any;
  cinemaId: any;

  ngOnInit() {

    this.columns = ['cinema', 'date', 'time', 'price', 'delete'];

    this.subscription = this.service.getByMovie(this.movieId).subscribe(async (data) => {
      if (data) {
        data = this.filterByDate(data);
        this.schedules = data.sort(this.sortBy('date'));
        await this.filterBytheater(this.theaterId);
        await this.filterByCinema(this.cinemaId);
        this.data = new MatTableDataSource(this.filtered);
      }
      else {
        this.schedules = [];
      }
    });

    this.subscription = this.theater$.subscribe(async (theater) => {
      if (theater) {
        this.theaterId = theater.id;
        await this.filterBytheater(theater.id);
        this.data = new MatTableDataSource(this.filtered);
      }
    });

    this.subscription = this.cinema$.subscribe(async (cinema) => {
      if (cinema) {
        this.cinemaId = cinema.id;
        await this.filterBytheater(this.theaterId);
        await this.filterByCinema(cinema.id);
        this.data = new MatTableDataSource(this.filtered);
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

  filterBytheater(id: any) {
    if (id && this.schedules && this.schedules.length > 0) {
      this.filtered = this.schedules.filter(o => o.theater.id == id);
    }
    else {
      this.filtered = this.schedules;
    }
  }

  filterByCinema(id: any) {
    if (id && this.schedules && this.schedules.length > 0) {
      this.filtered = this.filtered.filter(o => o.cinema.id == id);
    }
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
