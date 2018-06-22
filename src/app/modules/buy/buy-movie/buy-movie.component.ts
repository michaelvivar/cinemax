import { Component, OnInit } from '@angular/core';
import { FormBaseComponent } from '../../../utils/base.component';
import { FormBuilder, FormControl } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../../models/movie.model';
import { Cinema } from '../../../models/cinema.model';
import { Theater } from '../../../models/theater.model';
import { SetTheater } from '../../../ngxs/actions/theater.actions';
import { SetCinema } from '../../../ngxs/actions/cinema.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-buy-movie',
  templateUrl: './buy-movie.component.html',
  styles: []
})
export class BuyMovieComponent extends FormBaseComponent implements OnInit {

  constructor(
    formbuilder: FormBuilder, store: Store,
    private route: ActivatedRoute
  ) { super(formbuilder, store) }

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
