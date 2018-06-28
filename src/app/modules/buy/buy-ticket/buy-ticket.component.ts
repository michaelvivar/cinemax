import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Schedule } from '../../../models/schedule.model';
import { BaseComponent } from '../../../utils/base.component';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Seat } from '../../../models/seat.model';
import { MatStep, MatHorizontalStepper } from '@angular/material';
import { tap } from 'rxjs/operators';
import { RemoveTheater } from '../../../ngxs/actions/theater.actions';
import { RemoveCinema } from '../../../ngxs/actions/cinema.actions';
import { RemoveMovie } from '../../../ngxs/actions/movie.actions';
import { ResetSeat } from '../../../ngxs/actions/seat.actions';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styles: []
})
export class BuyTicketComponent extends BaseComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private formbuilder: FormBuilder,
  ) { super() }

  @Select(store => store.seats) seats$: Observable<{ selected: Seat[] }>;
  @ViewChildren(MatStep) steps: QueryList<MatStep>;
  @ViewChild('stepper') stepper: MatHorizontalStepper;
  schedule: Schedule;
  id: any;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  ngOnInit() {
    this.schedule = this.route.snapshot.data['schedule'];
    this.title = this.schedule.movie.title;
    this.firstFormGroup = this.formbuilder.group({
      seats: ['', Validators.min(1)]
    });
    this.secondFormGroup = this.formbuilder.group({
      payment: ['', Validators.requiredTrue]
    });
    this.subscription = this.seats$.pipe(tap(data => {
      this.firstFormGroup.get('seats').setValue(data.selected.length);
    }))
    .subscribe();
  }

  ngAfterViewInit() {
  }

  buy(payment) {
    if (payment) {
      this.steps.toArray()[0].editable = false;
      this.steps.toArray()[1].editable = false;
      this.secondFormGroup.get('payment').setValue(true);
      this.stepper.next();
    }
  }

  secondStep(event) {
    console.log(event);
  }

  ngAfterContentInit() {}
  save() {}
  cancel() {}

}
