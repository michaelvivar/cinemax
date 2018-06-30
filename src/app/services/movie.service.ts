import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { Movie } from '@models/movie.model';
import { SetMovie } from '@stores/actions/movie.actions';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private firestore: AngularFirestore, private store: Store) { }

  async getAsync(id: any) {
    let movie = null;
    await this.firestore.collection('movies').doc(id).ref.get().then(data => {
      movie = data.data() as Movie;
      movie.id = id;
    })
    this.store.dispatch(new SetMovie(movie));
    return movie;
  }

  async allAsync() {
    let movies: Movie[] = [];
    await this.firestore.collection('movies', q => q.orderBy('date')).ref.get().then(data => {
      movies = data.docs.map(doc => {
        const movie = doc.data() as Movie;
        movie.date = new Date(movie.date['seconds'] * 1000);
        movie.id = doc.id;
        return movie;
      });
    })
    return movies;
  }

  async allActiveAsync() {
    let movies: Movie[] = [];
    await this.firestore.collection('movies').ref.where('status', '==', true).get().then(data => {
      movies = data.docs.map(doc => {
        const movie = doc.data() as Movie;
        movie.date = new Date(movie.date['seconds'] * 1000);
        movie.id = doc.id;
        return movie;
      });
    })
    return movies;
  }

  allActive() {
    return this.firestore.collection('movies', ref => ref.where('status', '==', true)).snapshotChanges().pipe(map(docs => {
      return docs.map(doc => {
        const movie = doc.payload.doc.data() as Movie;
        movie.id = doc.payload.doc.id;
        movie.date = new Date(movie.date['seconds'] * 1000);
        return movie;
      })
    }))
  }

  add(movie: Movie) {
    return this.firestore.collection('movies').add(movie);
  }

  update(id: any, movie: Movie) {
    return this.firestore.collection('movies').doc(id).update(movie);
  }

  delete(id: any) {
    return this.firestore.collection('movies').doc(id).delete();
  }
}