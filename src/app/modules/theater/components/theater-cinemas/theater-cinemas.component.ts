import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { switchMap, map } from 'rxjs/operators';
import { BaseComponent } from '@utils/base.component';
import { CinemaService } from '@services/cinema.service';
import { Theater } from '@models/theater.model';
import { Cinema } from '@models/cinema.model';
import { ScheduleService } from '@services/schedule.service';

@Component({
   selector: 'theater-cinemas',
   templateUrl: './theater-cinemas.component.html',
   styles: []
})
export class TheaterCinemasComponent extends BaseComponent implements OnInit {

   constructor(
      private cinemaService: CinemaService,
      private scheduleService: ScheduleService
   ) { super() }

   @Select(store => store.theater) theater$: Observable<Theater>;
   theater: Theater;
   cinemas: Cinema[] = [];

   ngOnInit() {
      this.subscription = this.theater$.pipe(switchMap(theater => {
         this.theater = theater;
         return this.scheduleService.getSchedulesToday();
      })).subscribe(data => {
         const schedules = data.filter(o => o.theater == this.theater.id);
         this.cinemas = this.theater.cinemas.filter(o => o.status == true);
         this.cinemas.forEach(o => {
            o.schedules = schedules.filter(s => s.cinema == o.id);
         });
      });
   }
}