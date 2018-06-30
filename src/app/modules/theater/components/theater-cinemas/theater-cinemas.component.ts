import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { switchMap } from 'rxjs/operators';
import { BaseComponent } from '@utils/base.component';
import { CinemaService } from '@services/cinema.service';
import { Theater } from '@models/theater.model';
import { Cinema } from '@models/cinema.model';

@Component({
  selector: 'theater-cinemas',
  templateUrl: './theater-cinemas.component.html',
  styles: []
})
export class TheaterCinemasComponent extends BaseComponent implements OnInit {

  constructor(private cinemaService: CinemaService) { super() }

  @Select(store => store.theater) theater$: Observable<Theater>;
  cinemas: Cinema[] = [];

  ngOnInit() {
    this.subscription = this.theater$.pipe(switchMap(theater => {
      return this.cinemaService.allActive(theater.id);
    }))
    .subscribe(data => this.cinemas = data);
  }
}