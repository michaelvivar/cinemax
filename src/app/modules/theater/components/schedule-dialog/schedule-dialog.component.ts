import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Schedule } from '@models/schedule.model';
import { ConfirmDialog } from '@components/confirm-dialog/confirm-dialog.component';

@Component({
   selector: 'app-schedule-dialog',
   templateUrl: './schedule-dialog.component.html',
   styles: []
})
export class ScheduleDialogComponent implements OnInit {

   constructor(public dialogRef: MatDialogRef<ConfirmDialog>, @Inject(MAT_DIALOG_DATA) public schedules: Schedule[]) { }

   ngOnInit() {
   }

}
