import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableBaseComponent } from '../../../utils/base.component';
import { MatTableDataSource } from '@angular/material';
import { Theater } from '../../../models/theater.model';

@Component({
  selector: 'app-theater-table',
  templateUrl: './theater-table.component.html',
  styles: []
})
export class TheaterTableComponent extends TableBaseComponent implements OnInit {

  constructor(private route: ActivatedRoute) { super() }

  theaters: Theater[];

  ngOnInit() {
    this.title = 'Theaters';
    this.columns = ['name', 'status'];
    this.theaters = this.route.snapshot.data['theaters'];
    this.theaters.sort(this.sortBy('-status', 'name'));
    this.data = new MatTableDataSource(this.theaters);
    this.data.paginator = this.paginator;
  }
}
