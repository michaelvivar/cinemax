import { Injectable } from '@angular/core';
import { Schedule } from '../models/schedule.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Seat } from '../models/seat.model';
import { letters } from '../helpers/seat-helper';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private firestore: AngularFirestore) { }

  add(schedule: Schedule) {
    return this.firestore.collection('theaters').doc(schedule.theater).collection('cinemas').doc(schedule.cinema).collection('seats').ref.get().then(docs => {
      const seats = docs.docs.map(o => o.data() as Seat);
      for (let i = 1; i < 30; i++) {
        let x = 0; let y = 1;
        const seat = seats.filter(x => x.row == i && x.status == true).sort((a, b) => a.column - b.column);
        if (seat.length > 0) {
          seat.forEach(k => {
            const index = seats.findIndex(o => o.row == k.row && o.column == k.column);
            seats[index].name = letters[x] + '' + y;
            y++;
          })
          x++;
        }
      }
      schedule.seats = {};
      seats.forEach(o => schedule.seats[o.row + '-' + o.column] = o);
      return this.firestore.collection('schedules').add(schedule);
    })
  }
}
