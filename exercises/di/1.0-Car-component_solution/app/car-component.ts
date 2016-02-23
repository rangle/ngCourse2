import {Component} from 'angular2/core';
import {Engine} from './Engine';
import {Tires} from './Tires';
import {Body} from './Body';

@Component({
  selector: 'car-app',
  template: `<div>
              <h1>Car</h1>

              <b>Engine</b>
              
              <ul>
                <li>Horsepower = {{engine.horsepower}}</li>
                <li>Has a V8 = {{engine.isV8}}</li>
              </ul>

              <b>Tires</b>

              <ul>
                <li>Size = {{tires.size}}</li>
                <li>Does spin = {{tires.spinning}}</li>
              </ul>

              <b>Body</b>

              <ul>
                <li>Color = {{body.color}}</li>
              </ul>

            </div>`
})
export class Car {

  constructor(private engine: Engine, private tires: Tires, private body: Body) {
  }
}