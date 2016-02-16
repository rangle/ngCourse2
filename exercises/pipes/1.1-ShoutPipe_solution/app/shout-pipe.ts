import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'shout'})
export class ShoutPipe implements PipeTransform {
  transform(value: string, args: string[]) : any {
    const append = Boolean(args[0]);
    value = String(value).toUpperCase();
    return append ? `${value}!` : `${value}`; 
  }
};