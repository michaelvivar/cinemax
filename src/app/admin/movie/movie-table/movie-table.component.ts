import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { TableBaseComponent } from '@utils/base.component';
import { Movie } from '@models/movie.model';

@Component({
  selector: 'app-movie-table',
  templateUrl: './movie-table.component.html',
  styles: []
})
export class MovieTableComponent extends TableBaseComponent implements OnInit {

  constructor(private route: ActivatedRoute) { super() }

  movies: Movie[];

  ngOnInit() {
    this.title = 'Movies';
    this.columns = ['title', 'date', 'grade', 'status'];
    this.movies = this.route.snapshot.data['movies'];
    this.data = new MatTableDataSource(this.movies.sort(this.sortBy('-status', 'title')));
    this.data.paginator = this.paginator;
  }

  filter() {
    
  }

}
