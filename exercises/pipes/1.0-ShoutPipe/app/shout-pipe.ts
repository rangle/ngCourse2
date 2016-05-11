import { /* Imports */ } from '@angular/core';

@Pipe({name: 'shout'})
export class ShoutPipe implements /* an interface */ {
  transform(/*arguments*/) : any {
    return `the input value in uppercase`;
    }
}
