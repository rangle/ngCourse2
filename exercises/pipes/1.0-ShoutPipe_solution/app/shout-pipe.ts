import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'shout'})
export class ShoutPipe implements PipeTransform {
  transform(value: string) : any {
    return typeof value === 'string' ? value.toUpperCase() : value;   
  }
};