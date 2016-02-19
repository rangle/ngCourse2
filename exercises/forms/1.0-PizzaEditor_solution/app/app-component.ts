import {Component} from 'angular2/core';
import PizzaEditor from './pizza-editor';
import Pizza from './pizza';

@Component({
  selector: 'ngc-app',
  template: `<div class="p3">
    <h2 class="border-bottom caps">Pizza Editor</h2>
    <ngc-pizza-editor [(pizza)]="pizza">
    </ngc-pizza-editor>

  <pre class="p1 bg-darken-1 rounded">{{ pizza | json }}</pre>
  </div>`,
  directives: [PizzaEditor]
})
export default class App {
  pizza: Pizza = new Pizza(
    'Fior di Latte',
    'Tomato',
    'Basil',
    'Margherita'
  );
}
