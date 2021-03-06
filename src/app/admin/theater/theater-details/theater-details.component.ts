import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '@utils/base.component';
import { TheaterService } from '@services/theater.service';
import { Theater } from '@models/theater.model';

@Component({
  selector: 'app-theater-details',
  templateUrl: './theater-details.component.html',
  styles: []
})
export class TheaterDetailsComponent extends BaseComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TheaterService
  ) { super() }

  theater: Theater;

  ngOnInit() {
    this.theater = this.route.snapshot.data['theater'];
    this.title = this.theater.name;
  }

  delete() {
    this.confirm('Delete: ' + this.theater.name).then(o => {
      if (o) {
        this.service.delete(this.theater.id).then(() => {
          this.router.navigate(['/admin/theaters']);
        })
      }
    })
  }
}