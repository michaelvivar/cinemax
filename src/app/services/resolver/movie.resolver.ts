import { Injectable } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../../models/movie.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/public_api';

@Injectable({
  providedIn: 'root'
})
export class MovieResolver implements Resolve<Movie> {

  constructor(private service: MovieService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const id = route.paramMap.get('id');
      return this.service.getAsync(id);
  }
}

@Injectable({
  providedIn: 'root'
})
export class MoviesResolver implements Resolve<Movie[]> {

  constructor(private service: MovieService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const id = route.paramMap.get('id');
      return this.service.allAsync();
  }
}

@Injectable({
  providedIn: 'root'
})
export class ActiveMoviesResolver implements Resolve<Movie[]> {

  constructor(private service: MovieService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.service.allActiveAsync();
  }
}