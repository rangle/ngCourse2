import {Control} from '@angular/core';

interface IValidation {
  [key: string]: boolean;
}

export default class CustomValidators {

  static acceptableTopping(control: Control): IValidation {
    const acceptableToppings = ['tomato', 'basil', 'garlic', 'eggplant', 'onion', 'salami', 'prosciutto'];
  }

  static duplicateName(control: Control) {
  }

}
