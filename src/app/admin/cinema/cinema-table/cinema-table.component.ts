import { Component, OnInit, Input } from '@angular/core';
import { TableBaseComponent } from '../../../utils/base.component';
import { Cinema } from '../../../models/cinema.model';
import { MatTableDataSource } from '@angular/material';

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
    this.data = new MatTableDataSource(this.cinemas);
  }

}
