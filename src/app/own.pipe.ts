import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'own'
})
export class OwnPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
