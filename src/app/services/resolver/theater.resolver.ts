import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/public_api';
import { Theater } from '@models/theater.model';
import { TheaterService } from '@services/theater.service';

@Injectable({
  providedIn: 'root'
})
export class TheaterResolver implements Resolve<Theater> {

  constructor(private service: TheaterService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const theater = route.paramMap.get('theater');
      if (theater) {
        return this.get(theater);
      }
      else {
        const id = route.paramMap.get('id');
        return this.get(id);
      }
  }

  get(id: any) {
    return this.service.getAsync(id);
  }
}

@Injectable({
    providedIn: 'root'
  })
export class TheaterWithCinemasResolver implements Resolve<Theater> {

  constructor(private service: TheaterService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const id = route.paramMap.get('id');
      return this.service.getWithCinemasAsync(id);
  }
}

@Injectable({
  providedIn: 'root'
})
export class TheatersWithCinemasResolver implements Resolve<Theater[]> {

constructor(private service: TheaterService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.service.AllActiveWithAllActiveCinemasAsync();
  }
}

@Injectable({
  providedIn: 'root'
})
export class ActiveTheatersWithActiveCinemasResolver implements Resolve<Theater[]> {

constructor(private service: TheaterService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.service.AllActiveWithAllActiveCinemasAsync();
  }
}

@Injectable({
  providedIn: 'root'
})
export class TheatersResolver implements Resolve<Theater[]> {

  constructor(private service: TheaterService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.service.allAsync();
  }
}

@Injectable({
  providedIn: 'root'
})
export class ActiveTheatersResolver implements Resolve<Theater[]> {

  constructor(private service: TheaterService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.service.allActiveAsync();
  }
}