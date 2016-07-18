import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import ComponentTwo from './component-two';

@Injectable()
export class DeactivateGuard implements CanDeactivate<ComponentTwo> {

  canDeactivate(component: ComponentTwo) {
    let can = component.canDeactivate();
    console.log('DeactivateGuard#canDeactivate called, can: ', can);
    if (!can) {
      alert('Deactivation blocked');
      return false;
    }

    return true;
  }

}