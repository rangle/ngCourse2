import { Component } from '@angular/core';
import * as Immutable from 'immutable';

@Component({
  selector: 'app-root',
  template: `
    <h1>MovieApp</h1>
    <p>{{ slogan }}</p>
    <button type="button" (click)="changeActor()">
      Change Actor
    </button>
    <app-movie [title]="title" [actor]="actor"></app-movie>`
})
export class AppComponent {
  slogan = 'Just movie information';
  title = 'Terminator 1';
  actor: Immutable.Map<string, string> = Immutable.Map({ 
    firstName: 'Arnold', 
    lastName: 'Schwarzenegger'
  })
  
  changeActor(): void {
    this.actor = this.actor.merge({firstName: 'Nicholas', lastName: 'Cage'});
  }
}