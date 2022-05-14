import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullable'
})
export class NullablePipe implements PipeTransform {

  public transform(value: any): string {
    if(value === null || typeof value === null || value === undefined || typeof value === undefined)
      return '[nullable]';
    return value.toString();
  }

}
