import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { TableBaseComponent } from '@utils/base.component';
import { Cinema } from '@models/cinema.model';

@Component({
  selector: 'cinema-table',
  templateUrl: './cinema-table.component.html',
  styles: []
})
export class CinemaTableComponent extends TableBaseComponent implements OnInit {

  constructor() { super() }

  @Input('data') cinemas: Cinema[];
  @Input('theater') theaterId: any;

  ngOnInit() {
    this.title = 'Cinemas';
    this.columns = ['name', 'status'];
    this.cinemas.sort(this.sortBy('-status', 'name'));
    this.data = new MatTableDataSource(this.cinemas);
  }

  filter() {
    
  }

}
