import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceTitle'
})
export class SliceTitlePipe implements PipeTransform {



  transform(value: string, ...args: any[]): any {
    value=value.replace(value[0],value[0].toUpperCase());
    let tempVal  = value.split(' ');
    if(tempVal.length<7){
      return value;
    }
    let editVal = tempVal.slice(0,7).join(' ')+ ' ...';
    return editVal;
  }

}
