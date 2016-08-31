import {Input, Component} from '@angular/core';

@Component({
	selector: 'hello',
	template: `<p [ngStyle]="{'color': color}">Hello, {{name}}!</p>`,
})
export class Hello {
  @Input() name: string;
  color: string = 'black';

  constructor() {}

  private getRandomColor() {
      let letters = '0123456789ABCDEF'.split('');
      let color = '#';
      for (let i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }

  randomizeColor() {
    this.color = this.getRandomColor();
  }
}
