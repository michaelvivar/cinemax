import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Seat } from '@models/seat.model';

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  constructor(private firestore: AngularFirestore) {
    //const batch = firebase.firestore().batch();
  }

  get(theaterId: any, cinemaId: any): Observable<Seat[]> {
    return <any>this.firestore.collection('theaters').doc(theaterId).collection('cinemas').doc(cinemaId).collection('seats').snapshotChanges().pipe(map(docs => {
      return docs.map(doc => {
        const seat = doc.payload.doc.data() as Seat;
        seat.id = doc.payload.doc.id;
        return seat;
      })
    }));
  }

  update(theaterId: any, cinemaId: any, seatId: any, status: boolean) {
    return this.firestore.collection('theaters').doc(theaterId).collection('cinemas').doc(cinemaId).collection('seats').doc(seatId).update({ status });
  }
}