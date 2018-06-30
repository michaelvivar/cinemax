import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Movie } from '@models/movie.model';

@Component({
  templateUrl: './movie-info-dialog.component.html',
  styles: []
})
export class MovieInfoDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public movie: Movie) { }

  ngOnInit() {
  }
 
}
