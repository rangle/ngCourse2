import {Component, View} from 'angular2/core';
const STYLES = require('./card.css').toString();
const USER = require('!raw!../../assets/user.svg');
const CLOSE = require('!raw!../../assets/close.svg');
const CHECK = require('!raw!../../assets/check.svg');

@Component({
  selector: 'card',
  inputs: [
    'title',
    'content'
  ],
  styles: [STYLES],
  template: `
  <div class="bg-white rounded shadow">
    <div class="flex flex-center p2">
      <div>
        <h5 class="gray caps m0">
          ${USER}
          {{ title }}
        </h5>
        <p class="m0 h3">{{ content }}</p>
      </div>
    </div>
    <div class="border-top blue py1 px2 flex flex-auto">
      <div class="flex-auto"></div>
      <button class="btn red mr1">
        ${CLOSE}
        Delete
      </button>
      <button class="btn">
        ${CHECK}
        Done
      </button>
    </div>
  </div>
  `
})
export default class Card {
}
