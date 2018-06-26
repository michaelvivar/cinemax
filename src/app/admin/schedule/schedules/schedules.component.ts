import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cinema } from '../../../models/cinema.model';
import { Theater } from '../../../models/theater.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TableBaseComponent } from '../../../utils/base.component';
import { MatTableDataSource } from '@angular/material';
import { ScheduleService } from '../../../services/schedule.service';
import { Schedule } from '../../../models/schedule.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styles: []
})
export class SchedulesComponent extends TableBaseComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private formbuilder: FormBuilder,
    private service: ScheduleService
  ) { super() }

  form: FormGroup;
  theaters: Theater[] = [];
  cinemas: Cinema[] = [];
  today: Date;

  ngOnInit() {
    this.form = this.formbuilder.group({ theater: [], cinema: [], status: ['All'], date: [], text: [] });
    this.theaters = this.route.snapshot.data['theaters'];
    this.columns = ['select', 'movie', 'theater', 'cinema', 'date', 'time', 'price'];

    this.subscription = this.service.all().subscribe(async (data) => {
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
        const schedules = await data.sort(this.sortBy('-date'));
        this.data = new MatTableDataSource(schedules);
        this.data.filterPredicate = this.filter;
        this.data.paginator = this.paginator;
      }
    })

    const date = new Date();
    this.today = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0);
  }

  ngAfterViewInit() {
    this.form.get('theater').valueChanges.subscribe(value => {
      this.form.get('cinema').reset();
      this.cinemas = this.theaters.find(o => o.id == value).cinemas || [];
    })
    this.form.valueChanges
    .pipe(debounceTime(500))
    .pipe(distinctUntilChanged())
    .subscribe(value => {
      this.data.filter = value;
    })
  }

  publish() {
    this.service.publish(...this.selection.selected).then(() => {
      this.selection.clear();
    })
  }

  reset() {
    this.form.markAsUntouched();
    this.form.reset();
    this.cinemas = [];
  }

  filter(data: Schedule, filter: string) {
    const value: { theater: string, cinema: string, status: boolean, date: Date, text: string } = <any>filter;
    if (value.theater) {
      if (data.theater.id != value.theater) {
        return false;
      }
      if (value.cinema) {
        if (data.cinema.id != value.cinema) {
          return false;
        }
      }
    }
    if (value.status == true) {
      if (data.status != true) {
        return false;
      }
    }
    if (value.status == false) {
      if (data.status != false) {
        return false;
      }
    }
    if (value.date) {
      if (data.date.toDateString() != value.date.toDateString()) {
        return false;
      }
    }
    if (value.text) {
      const text = value.text.toLowerCase();
      const movie = (<string>data.movie.title).toLowerCase();
      if (!movie.includes(text)) {
        return false;
      }
    }
    return true;
  }
}
