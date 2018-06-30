import { Component, OnInit, Input } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { safeUrl } from '@utils/html-helper';

@Component({
  selector: 'movie-video',
  templateUrl: './movie-video.component.html',
  styles: []
})
export class MovieVideoComponent implements OnInit {

  constructor() { }

  @Input('url') movie: string;
  url: SafeUrl;
  
  ngOnInit() {
    if (this.movie) {
      this.url = safeUrl(this.movie.replace('watch?v=', 'embed/'));
    }
  }
}
