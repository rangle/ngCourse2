import { Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';


// naive implementation assumes small number increments
@Pipe({
  name: 'animateNumber',
  pure: false
})
export class AnimateNumberPipe implements PipeTransform {
  private currentNumber: number = null; // intermediary number
  private targetNumber: number = null;

  transform(targetNumber: number): string {
    if (targetNumber !== this.targetNumber) {
      this.currentNumber = this.targetNumber || targetNumber;
      this.targetNumber = targetNumber;

      const difference = this.targetNumber - this.currentNumber
      
      Observable.interval(100)
        .take(difference)
        .subscribe(() => {
          this.currentNumber++;
        })
    }
    
    return this.currentNumber;
  }
}
