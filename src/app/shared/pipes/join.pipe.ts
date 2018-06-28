import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {

  transform(value: any[], args?: string): any {
    return args ? value.join(args) : value.join(', ');
  }

}
