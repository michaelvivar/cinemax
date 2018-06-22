import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styles: []
})
export class AlertDialog {

  constructor(public dialogRef: MatDialogRef<AlertDialog>, @Inject(MAT_DIALOG_DATA) public data: any) { }

}
