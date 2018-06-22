import { Injectable } from '@angular/core';
import { Schedule } from '../models/schedule.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Seat } from '../models/seat.model';
import { letters } from '../helpers/seat-helper';
import { map, switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Theater } from '../models/theater.model';
import * as firebase from 'firebase/app';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private firestore: AngularFirestore) { }

  getByMovie(movieId: any) {
    return this.firestore.collection('movies').doc(movieId).snapshotChanges().pipe(map(doc => {
      const movie = doc.payload.data() as Movie;
      movie.id = doc.payload.id;
      return movie;
    }))
    .pipe(switchMap(value => {
      return this.firestore.collection('schedules', q => q.where('movie', '==', movieId)).snapshotChanges().pipe(map(docs => {
        return docs.map(doc => {
          const sched = doc.payload.doc.data() as Schedule;
          sched.date = new Date(sched.date['seconds'] * 1000);
          sched.id = doc.payload.doc.id;
          sched.movie = value;
          return sched;
        })
      }))
    }))
  }

  all() {
    return this.firestore.collection('schedules').snapshotChanges().pipe(map(docs => {
      return docs.map(doc => {
        const sched = doc.payload.doc.data() as Schedule;
        sched.date = new Date(sched.date['seconds'] * 1000);
        sched.id = doc.payload.doc.id;
        return sched;
      })
    }))
    .pipe(switchMap(values => combineLatest(values.map(value => {
      return this.firestore.collection('movies').doc(value.movie).snapshotChanges().pipe(map(doc => {
        value.movie = doc.payload.data();
        value.movie.id = doc.payload.id;
        return value;
      }))
    }))))
  }

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
      //seats.forEach(o => schedule.seats[o.row + '-' + o.column] = o);
      return this.firestore.collection('schedules').add(schedule);
    })
  }

  delete(id: any) {
    return this.firestore.collection('schedules').doc(id).delete();
  }

  async publish(...id: string[]) {
    const batch = firebase.firestore().batch();
    await id.forEach(o => {
      const ref = this.firestore.collection('schedules').doc(o).ref;
      batch.update(ref, { status: true });
    })
    batch.commit();
  }
}
