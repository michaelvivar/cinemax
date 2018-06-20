import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableBaseComponent } from '../../../utils/base.component';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-movie-table',
  templateUrl: './movie-table.component.html',
  styles: []
})
export class MovieTableComponent extends TableBaseComponent implements OnInit {

  constructor(private route: ActivatedRoute) { super() }

  movies: any;

  ngOnInit() {
    this.title = 'Movies';
    this.columns = ['title', 'date', 'grade', 'status'];
    this.data = new MatTableDataSource(this.route.snapshot.data['movies']);
    this.data.paginator = this.paginator;
  }

}
