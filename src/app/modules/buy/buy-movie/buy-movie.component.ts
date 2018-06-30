import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormBaseComponent } from '@utils/base.component';
import { Movie } from '@models/movie.model';
import { Theater } from '@models/theater.model';
import { SetTheater } from '@stores/actions/theater.actions';

@Component({
  selector: 'app-buy-movie',
  templateUrl: './buy-movie.component.html',
  styles: []
})
export class BuyMovieComponent extends FormBaseComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { super() }

  movie: Movie;
  theaters: Theater[] = [];

  ngOnInit() {
    this.movie = this.route.snapshot.data['movie'];
    this.theaters = this.route.snapshot.data['theaters'];
    this.form.addControl('theater', new FormControl());
  }

  ngAfterContentInit() {
    this.subscription = this.form.get('theater').valueChanges.subscribe(value => {
      const theater = this.theaters.find(o => o.id == value);
      this.store.dispatch(new SetTheater(theater));
    });
  }

  save() {}
  cancel() {}

}
