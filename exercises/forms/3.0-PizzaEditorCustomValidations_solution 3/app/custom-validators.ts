import {Control} from 'angular2/common';

interface IValidation {
  [key: string]: boolean;
}

export default class CustomValidators {

  static acceptableTopping(control: Control): IValidation {
    const acceptableToppings = ['tomato', 'basil', 'garlic', 'eggplant', 'onion', 'salami', 'prosciutto'];
    const chosenTopping = control.value.toLowerCase();
    const isValid =  acceptableToppings.includes(chosenTopping);

    return isValid ? null : { 'acceptableTopping': true };
  }

  static duplicateName(control: Control) {
    const q = new Promise<IValidation>((resolve, reject) => {
      setTimeout(() => {
        if (control.value.toLowerCase() === 'calabrese') {
          resolve({ 'duplicateName': true });
        } else {
          resolve(null);
        }
      }, 1000);
    });

    return q;
  }

}
