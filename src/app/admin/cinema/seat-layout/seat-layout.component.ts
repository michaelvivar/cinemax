import { Component, OnInit, Input } from '@angular/core';
import { SeatService } from '../../../services/seat.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Seat } from '../../../models/seat.model';
import { Store } from '@ngxs/store';

@Component({
  selector: 'seat-layout',
  templateUrl: './seat-layout.component.html',
  styles: []
})
export class SeatLayoutComponent implements OnInit {

  constructor(private service: SeatService, private store: Store) { }

  @Input('theater') theaterId: any;
  @Input('cinema') cinemaId: any;
  seats$: Observable<Seat[]>;
  loading = true;

  ngOnInit() {
    this.seats$ = this.service.get(this.theaterId, this.cinemaId).pipe(map(values => {
      const seats = [];
      let i = 0; let j = 0;
      values.sort((a, b) => a.row - b.row).forEach(seat => {
        if (!seats[seat.row - 1]) {
          seats[seat.row - 1] = [];
        }
        seats[seat.row - 1][seat.column - 1] = seat;
      })
      return seats;
    }))
    .pipe(tap(() => {
      if (this.loading == true) {
        this.loading = false;
      }
    }))
  }

  toggle(seat: Seat) {
    this.service.update(this.theaterId, this.cinemaId, seat.id, !seat.status);
    // seat.status = !seat.status;
    // this.store.dispatch(new AddSeat(seat));
  }
}