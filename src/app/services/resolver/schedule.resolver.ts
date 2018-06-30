import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/public_api';
import { ScheduleService } from '@services/schedule.service';
import { Schedule } from '@models/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleResolver implements Resolve<Schedule> {

  constructor(private service: ScheduleService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.paramMap.get('id');
    return this.service.getAsync(id);
  }
}