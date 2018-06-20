import { Component, OnInit } from '@angular/core';
import { FormBaseComponent } from '../../../utils/base.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Theater } from '../../../models/theater.model';
import { Cinema } from '../../../models/cinema.model';
import { CinemaService } from '../../../services/cinema.service';
import { switchMap, tap } from 'rxjs/operators';
import { timeValidator } from '../../../utils/form-validators';
import { combineDateTime, computeEndTime } from '../../../utils/datetime-helper';
import { ScheduleService } from '../../../services/schedule.service';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styles: []
})
export class ScheduleFormComponent extends FormBaseComponent implements OnInit {

  constructor(formbuilder: FormBuilder, store: Store, dialog: MatDialog,
    private route: ActivatedRoute,
    private cinemaService: CinemaService,
    private scheduleService: ScheduleService
  ) { super(formbuilder, store, dialog) }

  theaters: Theater[];
  cinemas: Cinema[];

  minDate: Date;
  maxDate: Date;

  ngOnInit() {
    this.form.addControl('theater', new FormControl(null, [Validators.required]));
    this.form.addControl('cinema', new FormControl({ value: null, disabled: true }, [Validators.required]));
    this.form.addControl('price', new FormControl(null, [Validators.required, Validators.min(0), Validators.max(1000)]));
    this.form.addControl('date', new FormControl(new Date(), [Validators.required]));
    this.form.addControl('start', new FormControl('00:00 AM'));
    this.form.addControl('end', new FormControl({ value: '00:00 AM', disabled: true }));
    this.form.get('start').setValidators([Validators.required, Validators.pattern('^[0-1]?[0-9]:[0-5][0-9]\\s(AM|PM)$')]);

    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(new Date().getDate() + 1);

    this.theaters = this.route.snapshot.data['theaters'];
  }

  ngAfterContentInit() {
    const runtime = 115;
    this.subscription = this.form.get('start').valueChanges.subscribe(value => {
      if (value != '00:00 AM' && this.form.get('start').errors == null) {
        const end = computeEndTime(value, runtime);
        this.form.get('end').setValue(end);
      }
    })
    this.subscription = this.form.get('theater').valueChanges.pipe(tap(() => {
      this.form.get('cinema').disable();
    })).pipe(switchMap(value => {
      return this.cinemaService.allActive(value);
    }))
    .subscribe(data => {
      this.form.get('cinema').reset();
      this.form.get('cinema').enable();
      this.cinemas = data;
    });
  }

  save() {
    if (this.form.valid) {
      if (this.form.get('start').value == '00:00 AM') {
        this.alert('Please set Time Start!');
        this.form.markAsUntouched();
        return;
      }
      const time = this.time();
      const data = {
        movie: '2mDU6iwsKrWFGHnPN6Xi',
        theater: this.form.get('theater').value,
        cinema: this.form.get('cinema').value,
        price: this.form.get('price').value,
        time
      }
      this.form.markAsUntouched();
      this.scheduleService.add(data).then(ref => {
        this.form.get('start').setValue('00:00 AM');
        this.form.get('end').setValue('00:00 AM');
      })
    }
  }

  private time() {
    const start = this.form.get('start').value as string;
    const end = this.form.get('end').value as string;
    const date = this.form.get('date').value as Date;

    return {
      start: combineDateTime(date, start),
      end: combineDateTime(date, end)
    }
  }

  cancel() {

  }

}
