import { Component, OnInit } from '@angular/core';
import { FormBaseComponent } from '../../../utils/base.component';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Theater } from '../../../models/theater.model';
import { Cinema } from '../../../models/cinema.model';
import { combineDateTime, computeEndTime } from '../../../utils/datetime-helper';
import { ScheduleService } from '../../../services/schedule.service';
import { Movie } from '../../../models/movie.model';
import { SetTheater } from '../../../ngxs/actions/theater.actions';
import { SetCinema } from '../../../ngxs/actions/cinema.actions';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styles: []
})
export class ScheduleFormComponent extends FormBaseComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private scheduleService: ScheduleService
  ) { super() }

  movie: Movie;
  theaters: Theater[];
  cinemas: Cinema[];

  minDate: Date;
  maxDate: Date;

  ngOnInit() {
    this.theaters = this.route.snapshot.data['theaters'];
    this.theaters.sort(this.sortBy('name'));
    this.movie = this.route.snapshot.data['movie'];
    this.title = this.movie.title;

    this.form.addControl('theater', new FormControl(null, [Validators.required]));
    this.form.addControl('cinema', new FormControl({ value: null, disabled: true }, [Validators.required]));
    this.form.addControl('price', new FormControl(null, [Validators.required, Validators.min(0)]));
    this.form.addControl('date', new FormControl(new Date(), [Validators.required]));
    this.form.addControl('start', new FormControl('00:00 AM'));
    this.form.addControl('end', new FormControl({ value: '00:00 AM', disabled: true }));
    this.form.get('start').setValidators([Validators.required, Validators.pattern('^((0[1-9])|1[0-2]):[0-5][0-9]\\s(AM|PM)$')]);
    ['date', 'start', 'end', 'price'].forEach(o => this.form.get(o).disable());

    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(new Date().getDate() + 1);
  }

  ngAfterContentInit() {
    this.subscription = this.form.get('start').valueChanges.subscribe(value => {
      if (value != '00:00 AM' && this.form.get('start').errors == null) {
        const end = computeEndTime(value, this.movie.runtime);
        this.form.get('end').setValue(end);
      }
    })
    this.subscription = this.form.get('theater').valueChanges.subscribe(value => {
      ['date', 'start', 'end', 'price'].forEach(o => this.form.get(o).disable());
      this.form.get('cinema').reset();
      const theater = this.theaters.find(o => o.id == value);
      this.store.dispatch(new SetTheater(theater));
      this.cinemas = theater.cinemas;
      this.form.get('cinema').enable();
    })
    this.subscription = this.form.get('cinema').valueChanges.subscribe(value => {
      if (value) {
        const cinema = this.cinemas.find(o => o.id == value);
        this.store.dispatch(new SetCinema(cinema));
        ['date', 'start', 'price'].forEach(o => this.form.get(o).enable());
      }
    })
  }

  save() {
    if (this.form.valid) {
      if (this.form.get('start').value == '00:00 AM') {
        this.alert('Please set Time Start!');
        this.form.markAsUntouched();
        return;
      }
      if (this.date() < new Date()) {
        this.alert('Invalid time!');
        this.form.markAsUntouched();
        return;
      }
      const data = {
        movie: this.movie.id,
        theater: this.form.get('theater').value,
        cinema: this.form.get('cinema').value,
        price: this.form.get('price').value,
        date: this.date(),
        time: {
          start: this.form.get('start').value,
          end: this.form.get('end').value
        },
        status: false
      }
      this.form.markAsUntouched();
      this.scheduleService.add(data).then(ref => {
        this.form.get('start').setValue('00:00 AM');
        this.form.get('end').setValue('00:00 AM');
      })
    }
  }

  private date() {
    const start = this.form.get('start').value as string;
    const date = this.form.get('date').value as Date;

    return combineDateTime(date, start);
  }

  cancel() {

  }

}
