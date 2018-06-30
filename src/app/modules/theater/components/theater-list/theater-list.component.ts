import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@utils/base.component';
import { TheaterService } from '@services/theater.service';
import { Theater } from '@models/theater.model';

@Component({
  selector: 'theater-list',
  templateUrl: './theater-list.component.html',
  styles: []
})
export class TheaterListComponent extends BaseComponent implements OnInit {

  constructor(private service: TheaterService) { super() }

  theaters: Theater[] = [];

  ngOnInit() {
    this.subscription = this.service.allActive().subscribe(data => this.theaters = data);
  }
}