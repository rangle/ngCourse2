import {Component} from '@angular/core';
import * as Immutable from 'immutable';

@Component({
  selector: 'main',
  template: `
    <h1>MovieApp</h1>
    <p>{{ slogan }}</p>
    <button type="button" (click)="changeActor()">Change Actor</button>
    <movie [title]="title" [actor]="actor"></movie>`
})
export class MainComponent {
  slogan: string = 'Just movie information';
  title: string = 'Terminator 1';
  actor: Immutable.Map<string, string> = Immutable.Map({firstName: 'Arnold', lastName: 'Schwarzenegger'})

  changeActor(): void {
    this.actor = this.actor.merge({firstName: 'Nicholas', lastName: 'Cage'});
  }
}
