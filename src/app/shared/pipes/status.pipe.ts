import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: boolean): any {
    return value ? 'Active' : 'Inactive';
  }

}
