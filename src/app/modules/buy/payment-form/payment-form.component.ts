import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Seat } from '../../../models/seat.model';
import { Observable } from 'rxjs';
import { BaseComponent } from '../../../utils/base.component';
import { Schedule } from '../../../models/schedule.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'payment-form',
  templateUrl: './payment-form.component.html',
  styles: []
})
export class PaymentFormComponent extends BaseComponent implements OnInit {

  constructor() { super() }

  @Input('data') schedule: Schedule;
  @Output('submit') submit = new EventEmitter<boolean>();
  @Select(store => store.seats.selected) seats$: Observable<Seat[]>;
  @Select(store => store.app.user) user$: Observable<any>;
  seats: Seat[] = [];

  ngOnInit() {
    this.subscription = this.seats$.subscribe(data => this.seats = data);
  }

  pay() {
    this.submit.emit(true);
  }
}
