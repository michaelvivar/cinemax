import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/public_api';
import { Schedule } from '../../models/schedule.model';
import { ScheduleService } from '../schedule.service';

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