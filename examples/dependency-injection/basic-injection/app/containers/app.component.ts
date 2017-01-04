import { Component } from '@angular/core';
import { ChatWidget } from '../components/chat-widget';

@Component({
  selector: 'app-root',
  template: `Encryption: {{ encryption }}`
})
export class AppComponent {
  encryption = chatWidget.chatSocket.encryption;

  constructor(private chatWidget: ChatWidget) { }
}