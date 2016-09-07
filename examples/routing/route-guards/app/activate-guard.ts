import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export default class ActivateGuard implements CanActivate {

  private can: boolean = false;

  canActivate() {
    console.log('ActivateGuard#canActivate called, can: ', this.can);
    if (!this.can) {
      alert('Activation blocked');
      return false;
    }

    return true;
  }

  setCanActivate(can) {
    this.can = can;
  }
}
