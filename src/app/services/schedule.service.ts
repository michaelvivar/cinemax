import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import * as firebase from 'firebase/app';
import { Store } from '@ngxs/store';
import { Schedule } from '@models/schedule.model';
import { SetTheater } from '@stores/actions/theater.actions';
import { SetCinema } from '@stores/actions/cinema.actions';
import { SetMovie } from '@stores/actions/movie.actions';
import { Movie } from '@models/movie.model';
import { Seat } from '@models/seat.model';
import { letters } from '@utils/seat.helper';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private firestore: AngularFirestore, private store: Store) { }

  async getAsync(id: any) {
    let schedule: Schedule;
    await this.firestore.collection('schedules').doc(id).ref.get().then(async (sched) => {
      schedule = sched.data() as Schedule;
      schedule.date = new Date(schedule.date['seconds'] * 1000);
      schedule.id = id;
      await this.firestore.collection('movies').doc(schedule.movie).ref.get().then(movie => {
        schedule.movie = movie.data();
        schedule.movie.id = movie.id;
      });
      await this.firestore.collection('theaters').doc(schedule.theater).ref.get().then(theater => {
        schedule.theater = theater.data();
        schedule.theater.id = theater.id;
      });
      await this.firestore.collection('theaters').doc(schedule.theater.id).collection('cinemas').doc(schedule.cinema).ref.get().then(cinema => {
        schedule.cinema = cinema.data();
        schedule.cinema.id = cinema.id;
      });
    });
    this.store.dispatch(new SetTheater(schedule.theater));
    this.store.dispatch(new SetCinema(schedule.cinema));
    this.store.dispatch(new SetMovie(schedule.movie));
    return schedule;
  }

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

  getByCinema(cinemaId: any) {
    return this.firestore.collection('schedules', q => q.where('cinema', '==', cinemaId)).snapshotChanges().pipe(map(docs => {
      return docs.map(doc => {
        const sched = doc.payload.doc.data() as Schedule;
        sched.id = doc.payload.doc.id;
        sched.date = new Date(sched.date['seconds'] * 1000);
        return sched;
      })
    }))
    .pipe(switchMap(values => combineLatest(values.map(value => {
      return this.firestore.collection('movies').doc(value.movie).snapshotChanges().pipe(map(doc => {
        const movie = doc.payload.data() as Movie;
        movie.id = doc.payload.id;
        value.movie = movie;
        return value;
      }))
    }))))
  }

  getSeats(id: any) {
    return this.firestore.collection('schedules').doc(id).collection('seats').snapshotChanges().pipe(map(docs => {
      return docs.map(doc => {
        const seat = doc.payload.doc.data() as Seat;
        seat.id = doc.payload.doc.id;
        return seat;
      })
    }));
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

  async publish(...schedules: Schedule[]) {
    const batch = firebase.firestore().batch();
    schedules.forEach(async (sched) => {
      const ref = this.firestore.collection('schedules').doc(sched.id).ref;
      batch.update(ref, { status: true });
    })
    await batch.commit();
    this.addSeats(schedules);
  }

  private addSeats(schedules: Schedule[]) {
    schedules.forEach(sched => {
      this.firestore.collection('theaters').doc(sched.theater.id).collection('cinemas').doc(sched.cinema.id).collection('seats').ref.get().then(items => {
        const seats = items.docs.map(item => item.data() as Seat);
        let count = 0;
        let batch = firebase.firestore().batch();
        this.addSeatName(seats).sort((a, b) => a.row + b.row).forEach(seat => {
          count++;
          const seatRef = this.firestore.collection('schedules').doc(sched.id).collection('seats').doc(seat.row + '-' + seat.column).ref;
          batch.set(seatRef, seat);
          if (count == 50) {
            batch.commit();
            count = 0;
            batch = firebase.firestore().batch();
          }
        });
        batch.commit();
      })
    })
  }

  private addSeatName(seats: Seat[]) {
    let x = 0;
    for (let i = 1; i < 30; i++) {
      let y = 1;
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
    return seats;
  }
}
