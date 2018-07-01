import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MatStep, MatHorizontalStepper } from '@angular/material';
import { tap } from 'rxjs/operators';
import { BaseComponent } from '@utils/base.component';
import { Seat } from '@models/seat.model';
import { Schedule } from '@models/schedule.model';
import { ScheduleService } from '@services/schedule.service';
import { ResetSeat, BuySeat } from '@stores/actions/seat.actions';

@Component({
   selector: 'app-buy-ticket',
   templateUrl: './buy-ticket.component.html',
   styles: []
})
export class BuyTicketComponent extends BaseComponent implements OnInit {

   constructor(
      private route: ActivatedRoute,
      private formbuilder: FormBuilder,
      private service: ScheduleService
   ) { super() }

   @Select(store => store.seats) seats$: Observable<{ selected: Seat[] }>;
   @ViewChildren(MatStep) steps: QueryList<MatStep>;
   @ViewChild('stepper') stepper: MatHorizontalStepper;
   schedule: Schedule;
   id: any;
   selected: Seat[] = [];

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
         .subscribe(data => {
            this.selected = data.selected;
         });
   }

   ngAfterViewInit() {
   }

   buy(payment) {
      if (payment) {
         this.store.dispatch(new BuySeat());
         this.steps.toArray()[0].editable = false;
         this.steps.toArray()[1].editable = false;
         this.service.buy(this.schedule.id, ...this.selected).then(() => {
            this.secondFormGroup.get('payment').setValue(true);
            this.stepper.next();
            this.store.dispatch(new ResetSeat());
            this.firstFormGroup.get('seats').setValue([true]);
         }).catch(err => {
            console.log(err);
         })
      }
   }

   secondStep(event) {
      console.log(event);
   }

   ngAfterContentInit() { }
   save() { }
   cancel() { }

}
