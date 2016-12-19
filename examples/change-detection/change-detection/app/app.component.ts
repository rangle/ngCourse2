import { Component } from '@angular/core';
import { Actor } from './actor.model';

@Component({
  selector: 'app-root',
  template: `
    <h1>MovieApp</h1>
    <p>{{ slogan }}</p>
    <button type="button" (click)="changeActorProperties()">
      Change Actor Properties
    </button>
    <button type="button" (click)="changeActorObject()">
      Change Actor Object
    </button>
    <app-movie [title]="title" [actor]="actor"></app-movie>`
})
export class AppComponent {
  slogan = 'Just movie information';
  title = 'Terminator 1';
  actor = new Actor('Arnold', 'Schwarzenegger');
  
  changeActorProperties(): void {
    this.actor.firstName = 'Nicholas';
    this.actor.lastName = 'Cage';
  }
  
  changeActorObject(): void {
    this.actor = new Actor('Bruce', 'Willis');
  }
}