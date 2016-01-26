import {Pipe, PipeTransform} from 'angular2/core';
import {List} from 'immutable';

@Pipe({ name: 'size' })
export class SizePipe implements PipeTransform {
  transform(list: List<any>): number {
    return list.size;
  }
}
