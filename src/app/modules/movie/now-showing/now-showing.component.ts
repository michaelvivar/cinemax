import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movie.service';
import { BaseComponent } from '../../../utils/base.component';
import { Movie } from '../../../models/movie.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'now-showing',
  templateUrl: './now-showing.component.html',
  styles: []
})
export class NowShowingComponent extends BaseComponent implements OnInit {

  constructor(private service: MovieService) { super() }

  movies$: Observable<Movie[]>;

  ngOnInit() {
    const today = new Date();
    this.movies$ = this.service.allActive().pipe(map(values => {
      return values.map(value => {
        if (value.date > today) {
          value.status = false;
        }
        return value;
      })
    }))
  }
}