import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'shout'})
export class ShoutPipe implements PipeTransform {
  transform(/*arguments*/) : any {
    return `the input string in uppercase, append an '!' if a true value is passed in as an argument`; 
  }
};