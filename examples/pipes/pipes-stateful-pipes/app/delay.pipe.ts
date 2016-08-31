import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'delay',
  pure: false
})
export class DelayPipe implements PipeTransform {
  private fetchedValue: number;
  private fetchPromise: Promise<number>;

  transform(value: number): number {
    if (!this.fetchPromise) {
      this.fetchPromise = new Promise<number>((resolve, reject) => {
        setTimeout(() => resolve(value * 1000), value * 500);
      });

      this.fetchPromise.then((val: number)   => this.fetchedValue = val);
    }
    return this.fetchedValue;
  }
}
