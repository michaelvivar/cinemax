import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from 'angularfire2/firestore';
import { Theater } from '../models/theater.model';
import { Cinema } from '../models/cinema.model';

@Injectable({
  providedIn: 'root'
})
export class TheaterService {

  constructor(private http: HttpClient, private firestore: AngularFirestore) { }

  async getAsync(id: any) {
    let theater = null;
    await this.firestore.collection('theaters').doc(id).ref.get().then(data => {
      theater = data.data() as Theater;
      theater.id = id;
    })
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
    return theater;
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