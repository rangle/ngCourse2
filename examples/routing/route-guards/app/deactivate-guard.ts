import { CanDeactivate } from '@angular/router';
import ComponentTwo from './component-two';

export default class DeactivateGuard implements CanDeactivate<ComponentTwo> {

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
