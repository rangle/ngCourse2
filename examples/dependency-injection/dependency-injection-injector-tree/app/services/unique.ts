import { Injectable } from '@angular/core';

@Injectable()
export class Unique {
  value: string;
  
  constructor() {
    this.value = (+Date.now()).toString(16) + '.' + 
      Math.floor(Math.random() * 500);
  }
}
