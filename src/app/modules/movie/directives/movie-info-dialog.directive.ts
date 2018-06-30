import { Directive, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Movie } from '@models/movie.model';
import { MovieInfoDialogComponent } from '@modules/movie/components/movie-info-dialog/movie-info-dialog.component';

@Directive({
  selector: '[movieInfoDialog]'
})
export class MovieInfoDialogDirective {

  constructor(private dialog: MatDialog) { }

  @HostListener('click') open() {
    this.dialog.open(MovieInfoDialogComponent, {
      width: '560px',
      data: this.movie,
      panelClass: 'padding-0'
    })
  }

  @Input('movieInfoDialog') movie: Movie;

}
