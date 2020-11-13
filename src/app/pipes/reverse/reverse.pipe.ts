import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: string): string {

    if (typeof value != 'string'){
      throw new Error('ReversePipe: not a string');
    }
    if (value === 'error'){
      throw new Error('ReversePipe: error string');
    }

    let str = '';
    for(let i = value.length-1;i>=0;i--){
      str += value.charAt(i);
    }
    return str;
  }
}
