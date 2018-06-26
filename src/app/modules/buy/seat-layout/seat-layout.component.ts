import { Component, OnInit, Input } from '@angular/core';
import { ScheduleService } from '../../../services/schedule.service';
import { Seat } from '../../../models/seat.model';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MatCheckboxChange, MatDialog } from '@angular/material';
import { Store, Select } from '@ngxs/store';
import { AddSeat, RemoveSeat } from '../../../ngxs/actions/seat.actions';
import { BaseComponent } from '../../../utils/base.component';

@Component({
  selector: 'seat-layout',
  templateUrl: './seat-layout.component.html',
  styles: []
})
export class SeatLayoutComponent extends BaseComponent implements OnInit {

  constructor(private service: ScheduleService, private store: Store, dialog: MatDialog) { super(dialog) }

  @Input('id') id: any;
  @Select(store => store.seats) seats$: Observable<{ selected: Seat[] }>;
  selected: Seat[] = [];
  seats: Seat[] = [];

  ngOnInit() {
    this.seats$.subscribe(seats => this.selected = seats.selected);

    this.service.getSeats(this.id).subscribe(async (items) => {
      const taken = [];
      await items.sort((a, b) => a.row - b.row).forEach(seat => {
        if (this.selected.find(o => o.row == seat.row && o.column == seat.column)) {
          if (seat.value == 1) {
            this.store.dispatch(new RemoveSeat(seat));
            taken.push(seat.name);
          }
          else {
            seat.value = 2;
          }
        }
        if (!this.seats[seat.row - 1]) {
          this.seats[seat.row - 1] = <any>[];
        }
        this.seats[seat.row - 1][seat.column - 1] = seat;
      })
      if (taken.length > 0) {
        if (taken.length == 1) {
          this.alert(`Seat ${taken[0]} is already taken, please select other seat!`);
        }
        else {
          this.alert(`Seats ${taken.join(', ')} are already taken, please select other seats!`);
        }
      }
    })
  }

  clicked(seat: Seat, event: MatCheckboxChange) {
    if (event.checked) {
      this.store.dispatch(new AddSeat(seat));
    }
    else {
      this.store.dispatch(new RemoveSeat(seat));
    }
  }
}
