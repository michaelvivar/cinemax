import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/public_api';
import { Cinema } from '@models/cinema.model';
import { CinemaService } from '@services/cinema.service';

@Injectable({
  providedIn: 'root'
})
export class CinemaResolver implements Resolve<Cinema> {

  constructor(private service: CinemaService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const theater = route.paramMap.get('theater');
    const cinema = route.paramMap.get('cinema');
    return this.service.getAsync(theater, cinema);
  }
}