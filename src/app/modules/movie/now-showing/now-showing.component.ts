import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movie.service';
import { BaseComponent } from '../../../utils/base.component';
import { Movie } from '../../../models/movie.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'now-showing',
  templateUrl: './now-showing.component.html',
  styles: []
})
export class NowShowingComponent extends BaseComponent implements OnInit {

  constructor(private service: MovieService) { super() }

  movies$: Observable<Movie[]>;

  ngOnInit() {
    this.movies$ = this.service.allActive();
  }

}
