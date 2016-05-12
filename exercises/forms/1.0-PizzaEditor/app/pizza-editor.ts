import {Component, EventEmitter} from '@angular/core';
import {
  FORM_DIRECTIVES,
  FormBuilder,
  ControlGroup,
  Control,
  Validators
} from '@angular/common';
import Pizza from './pizza';

@Component({
  selector: 'ngc-pizza-editor',
  templateUrl: 'app/pizza-editor.html',
  inputs: ['pizza'],
  outputs: ['pizzaChange']
})
export default class PizzaEditor {
  pizzaForm: ControlGroup;
  pizza: Pizza;
  pizzaChange: EventEmitter = new EventEmitter();

  constructor(
  ) {
  }

  onSubmit() {
    this.pizzaChange.emit(this.pizzaForm.value);
  }
}
