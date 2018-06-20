import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../../utils/base.component';
import { Movie } from '../../../models/movie.model';
import { ImageUpload } from '../../../models/image-upload.model';
import { ImageService } from '../../../services/image.service';
import { MovieService } from '../../../services/movie.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styles: []
})
export class MovieDetailsComponent extends BaseComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private imageService: ImageService,
    private movieService: MovieService,
    dialog: MatDialog
  ) { super(dialog) }

  @ViewChild('btn') uploadBtn: ElementRef;

  movie: Movie;

  ngOnInit() {
    this.movie = this.route.snapshot.data['movie'];
    this.movie.date = new Date(this.movie.date['seconds'] * 1000);
    this.title = this.movie.title;
  }

  openFileWindow() {
    this.uploadBtn.nativeElement.click();
  }

  progress = 0;
  poster = false;

  uploadImage(event: any) {
    const files: FileList = event.target.files;
    const upload = new ImageUpload(files.item(0));
    this.imageService.upload(upload).then(img => {
      this.poster = true;
      this.movie.image = img.url;
      this.movieService.update(this.movie.id, <any>{ image: img.url });
    });

    upload.progress.subscribe(x => this.progress = x);
  }

  delete() {
    this.confirm('Delete: ' + this.movie.title).then(o => {
      if (o) {
        this.movieService.delete(this.movie.id).then(() => {
          this.router.navigate(['/admin/movies']);
        })
      }
    })
  }
}