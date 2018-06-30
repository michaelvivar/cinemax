import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Theater } from '@models/theater.model';
import { Movie } from '@models/movie.model';
import { ScheduleService } from '@services/schedule.service';
import { FormBaseComponent } from '@utils/base.component';

@Component({
  selector: 'movie-schedule',
  templateUrl: './movie-schedule.component.html',
  styles: []
})
export class MovieScheduleComponent extends FormBaseComponent implements OnInit {

  constructor(
    private service: ScheduleService,
    private route: ActivatedRoute,
  ) { super() }

  @Select(store => store.theater) theater$: Observable<Theater>;
  id: any;
  theaters: Theater[] = [];
  movie: Movie;

  ngOnInit() {
    this.movie = this.route.snapshot.data['movie'];
    this.theaters = this.route.snapshot.data['theaters'];
    this.id = this.route.snapshot.paramMap.get('id');
    this.form.addControl('theater', new FormControl());
    
    this.subscription = this.service.getByMovie(this.id)
    .pipe(map(data => {
      this.theaters.forEach(t => {
        t.cinemas.forEach(c => {
          c.schedules = data.filter(s => s.cinema == c.id && s.status == true && s.date > new Date());
        })
      })
      return data;
    }))
    .subscribe(data => {

    });
  }

  ngAfterContentInit() {
    this.subscription = this.form.get('theater').valueChanges.subscribe(value => {
      this.theaters.forEach(o => {
        o.status = o.id == value ? true : false;
      })
    });
  }

  save() {}
  cancel() {}
}