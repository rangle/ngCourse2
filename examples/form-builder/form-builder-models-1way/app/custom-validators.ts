import {Control} from '@angular/common';

interface IValidation {
  [key: string]: boolean;
}

export class CustomValidators {
  
  static emailFormat(control: Control): IValidation {
    let pattern:RegExp = /\S+@\S+\.\S+/;
    return pattern.test(control.value) ? null : {"emailFormat": true};
  }
  
  static duplicated(control: Control) {
    const q = new Promise<IValidation>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'john.doe@gmail.com') {
          resolve({'duplicated': true});
        } else {
          resolve(null);
        }
      }, 1000);
    });
    return q;
  }
}