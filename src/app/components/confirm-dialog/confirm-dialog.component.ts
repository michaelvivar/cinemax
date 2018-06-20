import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './confirm-dialog.component.html',
  styles: []
})
export class ConfirmDialog {

  constructor(public dialogRef: MatDialogRef<ConfirmDialog>, @Inject(MAT_DIALOG_DATA) public message: any) { }

}