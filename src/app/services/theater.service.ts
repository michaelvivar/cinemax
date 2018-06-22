import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from 'angularfire2/firestore';
import { Theater } from '../models/theater.model';
import { Cinema } from '../models/cinema.model';
import { Store } from '@ngxs/store';
import { SetTheater } from '../ngxs/actions/theater.actions';

@Injectable({
  providedIn: 'root'
})
export class TheaterService {

  constructor(private http: HttpClient, private firestore: AngularFirestore, private store: Store) { }

  get(id: any) {
    return this.firestore.collection('theaters').doc(id).valueChanges();
  }

  async getAsync(id: any) {
    let theater = null;
    await this.firestore.collection('theaters').doc(id).ref.get().then(data => {
      theater = data.data() as Theater;
      theater.id = id;
    })
    this.store.dispatch(new SetTheater(theater));
    return theater;
  }

  async getWithCinemasAsync(id: any) {
    let theater: Theater = null;
    await this.firestore.collection('theaters').doc(id).ref.get().then(async (data) => {
      theater = data.data() as Theater;
      theater.id = id;
      theater.cinemas = [];
      await data.ref.collection('cinemas').get().then(docs => {
        docs.forEach(doc => {
          const cinema = doc.data() as Cinema;
          cinema.id = doc.id;
          theater.cinemas.push(cinema);
        })
      })
    })
    this.store.dispatch(new SetTheater(theater));
    return theater;
  }

  async allWithAllCinemasAsync() {
    const theaters: Theater[] = [];
    await this.firestore.collection('theaters').ref.get().then(async docs => {
      await docs.forEach(async doc => {
        const theater = doc.data() as Theater;
        theater.id = doc.id;
        theater.cinemas = [];
        await doc.ref.collection('cinemas').get().then(async items => {
          await items.forEach(item => {
            const cinema = item.data() as Cinema;
            cinema.id = item.id;
            theater.cinemas.push(cinema);
          })
        })
        theaters.push(theater);
      })
    })
    return theaters;
  }

  async AllActiveWithAllActiveCinemasAsync() {
    const theaters: Theater[] = [];
    await this.firestore.collection('theaters').ref.where('status', '==', true).get().then(async docs => {
      await docs.forEach(async doc => {
        const theater = doc.data() as Theater;
        theater.id = doc.id;
        theater.cinemas = [];
        await this.firestore.collection('theaters').doc(doc.id).collection('cinemas').ref.where('status', '==', true).get().then(async items => {
          await items.forEach(item => {
            const cinema = item.data() as Cinema;
            cinema.id = item.id;
            theater.cinemas.push(cinema);
          })
        })
        theaters.push(theater);
      })
    })
    return theaters;
  }

  async allAsync() {
    let theaters: Theater[] = [];
    await this.firestore.collection('theaters', q => q.orderBy('status')).ref.get().then(data => {
      theaters = data.docs.map(doc => {
        const theater = doc.data() as Theater;
        theater.id = doc.id;
        return theater;
      });
    })
    return theaters;
  }

  async allActiveAsync() {
    let theaters: Theater[] = [];
    await this.firestore.collection('theaters', q => q.where('status', '==', true)).ref.get().then(data => {
      theaters = data.docs.map(doc => {
        const theater = doc.data() as Theater;
        theater.id = doc.id;
        return theater;
      });
    })
    return theaters;
  }

  add(theater: Theater) {
    return this.firestore.collection('theaters').add(theater);
  }

  update(id: any, theater: Theater) {
    return this.firestore.collection('theaters').doc(id).update(theater);
  }

  delete(id: any) {
    return this.firestore.collection('theaters').doc(id).delete();
  }
}