import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'omit'
})
export class OmitPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (typeof value === 'string') {
        return value.substr(0, args) + (value.length > args ? '...' : '');
    }
    return value;
  }
}
