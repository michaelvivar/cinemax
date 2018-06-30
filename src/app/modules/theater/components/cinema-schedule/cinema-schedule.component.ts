import { Component, OnInit, Input } from '@angular/core';
import { ScheduleService } from '@services/schedule.service';
import { Schedule } from '@models/schedule.model';
import { Cinema } from '@models/cinema.model';
import { BaseComponent } from '@utils/base.component';

@Component({
  selector: 'cinema-schedule',
  templateUrl: './cinema-schedule.component.html',
  styles: []
})
export class CinemaScheduleComponent extends BaseComponent implements OnInit {

  constructor(private scheduleService: ScheduleService) { super() }

  @Input('data') cinema: Cinema;
  schedules: Schedule[] = [];

  ngOnInit() {
    this.subscription = this.scheduleService.getByCinema(this.cinema.id).subscribe(data => {
      this.schedules = data.sort(this.sortBy('date'));
    });
  }

  get sched() {
    if (this.schedules && this.schedules.length > 0) {
      return this.schedules[0];
    }
  }
}
