import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { BaseComponent } from '../../utils/base.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(private route: ActivatedRoute) { super() }

  movies: Movie[];

  ngOnInit() {
    this.movies = (<any[]>this.route.snapshot.data['movies']).sort(this.sortBy('-date'));
  }
}
