import { Component } from '@angular/core';
import { ChatWidget } from '../components/chat-widget';

@Component({
  selector: 'app',
  template: `Encryption: {{ encryption }}`
})
export class App {
  encryption: boolean;
  constructor(chatWidget: ChatWidget) {
    this.encryption = chatWidget.chatSocket.encryption;
  }
}