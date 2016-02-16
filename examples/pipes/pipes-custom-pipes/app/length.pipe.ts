import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'length'})
export class LengthPipe implements PipeTransform {
  transform(value:string, args:string[]) : any {
    let displayMessage: boolean = Boolean(args[0]);
    return displayMessage ? `${value} ${value.length}` : `${value.length}`
    
  }
}