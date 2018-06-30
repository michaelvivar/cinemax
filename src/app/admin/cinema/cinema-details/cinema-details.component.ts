import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '@utils/base.component';
import { CinemaService } from '@services/cinema.service';
import { Cinema } from '@models/cinema.model';
import { Theater } from '@models/theater.model';

@Component({
  selector: 'app-cinema-details',
  templateUrl: './cinema-details.component.html',
  styles: []
})
export class CinemaDetailsComponent extends BaseComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private service: CinemaService) { super() }

  cinema: Cinema;
  theater: Theater;
  
  ngOnInit() {
    this.theater = this.route.snapshot.data['theater'];
    this.cinema = this.route.snapshot.data['cinema'];
    this.theater.id = this.route.snapshot.params['theater'];
    this.title = this.theater.name + ' - ' + this.cinema.name;
  }

  delete() {
    this.confirm('Delete: ' + this.cinema.name).then(o => {
      if (o) {
        this.service.delete(this.theater.id, this.cinema.id).then(() => {
          this.router.navigate(['/admin/theater', this.theater.id]);
        })
      }
    })
  }
}
