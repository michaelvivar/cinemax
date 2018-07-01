import { Directive, HostListener, ElementRef, Renderer2, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ScheduleDialogComponent } from '@modules/theater/components/schedule-dialog/schedule-dialog.component';

@Directive({
   selector: '[sched-dialog]'
})
export class SchedDialogDirective {

   constructor(private dialog: MatDialog, host: ElementRef, renderer: Renderer2) {
      //renderer.setStyle(host, 'cursor', 'pointer');
   }

   @Input('sched-dialog') schedules: any;

   @HostListener('click') open() {
      this.dialog.open(ScheduleDialogComponent, {
         width: '400px',
         data: this.schedules,
         autoFocus: false
      });
   }
}