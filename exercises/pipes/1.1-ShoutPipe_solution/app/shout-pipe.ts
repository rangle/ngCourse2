import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'shout'})
export class ShoutPipe implements PipeTransform {
  transform(value: string, append: boolean) : any {
    value = String(value).toUpperCase();
    return append ? `${value}!` : `${value}`;
  }
};
