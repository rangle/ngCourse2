import {Component, EventEmitter} from 'angular2/core';
import {
  FORM_DIRECTIVES,
  FormBuilder,
  ControlGroup,
  Control,
  Validators
} from 'angular2/common';
import Pizza from './pizza';

@Component({
  selector: 'ngc-pizza-editor',
  styles:[``],
  templateUrl: 'app/pizza-editor.html',
  inputs: ['pizza'],
  outputs: ['pizzaChange']
})
export default class PizzaEditor {
  pizzaForm: ControlGroup;
  pizza: Pizza;
  pizzaChange: EventEmitter = new EventEmitter();

  constructor(
    fb: FormBuilder
  ) {
    this.pizzaForm = fb.group({
      cheese: [],
      sauce: [],
      topping: [],
      name: []
    });
  }

  onSubmit() {
    this.pizzaChange.emit(this.pizzaForm.value);
  }
}
