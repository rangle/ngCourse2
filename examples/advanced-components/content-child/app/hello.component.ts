import { Input, Component } from '@angular/core';

@Component({
	selector: 'app-hello',
	template: `<p [ngStyle]="{ 'color': color }">Hello, {{name}}!</p>`,
})
export class HelloComponent {
  @Input() name: string;
  color = 'black';

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
