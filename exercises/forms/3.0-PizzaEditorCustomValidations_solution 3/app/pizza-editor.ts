import {Component, EventEmitter} from 'angular2/core';
import {
  FORM_DIRECTIVES,
  FormBuilder,
  ControlGroup,
  Control,
  Validators
} from 'angular2/common';
import Pizza from './pizza';
import CustomValidators from './custom-validators';

@Component({
  selector: 'ngc-pizza-editor',
  styles:[`
  .field.ng-invalid { border-color: #ff4136; }
  .field.ng-invalid:focus{ box-shadow: 0 0 0 2px rgba(255,65,54,.5); }

  .field.ng-valid:focus { box-shadow: 0 0 0 2px rgba(46, 204, 64, 0.5); }
  .field.ng-valid { border-color: #2ecc40; }
  `],
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
      cheese: ['',
        Validators.compose([Validators.required])
      ],
      sauce: ['',
        Validators.compose([Validators.required])
      ],
      topping: ['',
        Validators.compose([CustomValidators.acceptableTopping])
      ],
      name: ['',
        Validators.compose([Validators.required]),
        CustomValidators.duplicateName
      ]
    });
  }

  onSubmit() {
    this.pizzaChange.emit(this.pizzaForm.value);
  }
}
