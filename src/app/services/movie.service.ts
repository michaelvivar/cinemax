import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from 'angularfire2/firestore';
import { Movie } from '../models/movie.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient, private firestore: AngularFirestore) { }

  async getAsync(id: any) {
    let movie = null;
    await this.firestore.collection('movies').doc(id).ref.get().then(data => {
      movie = data.data() as Movie;
      movie.id = id;
    })
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