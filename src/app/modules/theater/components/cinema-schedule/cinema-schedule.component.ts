import { Component, Input } from '@angular/core';
import { Cinema } from '@models/cinema.model';
import { BaseComponent } from '@utils/base.component';

@Component({
   selector: 'cinema-schedule',
   templateUrl: './cinema-schedule.component.html',
   styles: []
})
export class CinemaScheduleComponent extends BaseComponent {

   constructor() { super() }

   @Input('data') cinema: Cinema;

   get sched() {
      if (this.cinema.schedules && this.cinema.schedules.length > 0) {
         return this.cinema.schedules[0];
      }
   }
}
