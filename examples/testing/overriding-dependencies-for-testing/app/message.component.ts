import {Component} from '@angular/core';

@Component({
  selector: 'display-message',
  template: '<div><div><h1>{{message}}</h1><div></div>'
})
export class MessageComponent {
  public message: string = '';

  constructor() {}

  setMessage(newMessage: string) {
  	this.message = newMessage;
  }

  clearMessage() {
    this.message = '';
  }
}