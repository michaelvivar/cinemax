import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Store } from '@ngxs/store';
import { Cinema } from '@models/cinema.model';
import { SetCinema } from '@stores/actions/cinema.actions';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  constructor(private http: HttpClient, private firestore: AngularFirestore, private store: Store) { }

  async getAsync(theaterId: any, cinemaId: any) {
    let cinema: Cinema = null;
    await this.firestore.collection('theaters').doc(theaterId).collection('cinemas').doc(cinemaId).ref.get().then(data => {
      cinema = data.data() as Cinema;
      cinema.id = cinemaId;
    })
    this.store.dispatch(new SetCinema(cinema));
    return cinema;
  }

  all(theaterId: any) {
    return this.firestore.collection('theaters').doc(theaterId).collection('cinemas').snapshotChanges().pipe(map(docs => {
      return docs.map(doc => {
        const cinema = doc.payload.doc.data() as Cinema;
        cinema.id = doc.payload.doc.id;
        return cinema;
      })
    }))
  }

  allActive(theaterId: any) {
    return this.firestore.collection('theaters').doc(theaterId).collection('cinemas', q => q.where('status', '==', true)).snapshotChanges().pipe(map(docs => {
      return docs.map(doc => {
        const cinema = doc.payload.doc.data() as Cinema;
        cinema.id = doc.payload.doc.id;
        return cinema;
      })
    }))
  }

  async allAsync() {
    let cinema: Cinema[] = [];
    await this.firestore.collection('cinemas').ref.get().then(data => {
      cinema = data.docs.map(doc => {
        const theater = doc.data() as Cinema;
        theater.id = doc.id;
        return theater;
      });
    })
    return cinema;
  }

  async allActiveAsync(theaterId: any) {
    let cinema: Cinema[] = [];
    await this.firestore.collection('theaters').doc(theaterId).collection('cinemas', q => q.where('status', '==', true)).ref.get().then(data => {
      cinema = data.docs.map(doc => {
        const theater = doc.data() as Cinema;
        theater.id = doc.id;
        return theater;
      });
    })
    return cinema;
  }

  add(theaterId: any, cinema: Cinema) {
    return this.firestore.collection('theaters').doc(theaterId).collection('cinemas').add(cinema).then(ref => {
      this.addSeats(theaterId, ref.id, cinema.row, cinema.column);
      return ref;
    })
  }

  private addSeats(theaterId: any, cinemaId: any, row: number, column: number) {
    const seats = this.firestore.collection('theaters').doc(theaterId).collection('cinemas').doc(cinemaId).collection('seats');
    for (let i = 1; i <= row; i++) {
      const batch = firebase.firestore().batch();
      for (let j = 1; j <= column; j++) {
        const ref = seats.doc(i + '-' + j).ref;
        const seat = { value: 0, status: true, row: i, column: j };
        batch.set(ref, seat);
      }
      batch.commit();
    }
  }

  update(theaterId: any, id: any, cinema: Cinema) {
    return this.firestore.collection('theaters').doc(theaterId).collection('cinemas').doc(id).update(cinema);
  }

  delete(theaterId: any, cinemaId: any) {
    return this.firestore.collection('theaters').doc(theaterId).collection('cinemas').doc(cinemaId).delete();
  }
}