import {Component} from 'angular2/core';
const STYLES = require('./card.css').toString();
const TEMPLATE = require('./card.html');
import CheckIcon from '../icons/check';
import CloseIcon from '../icons/close';
import UserIcon from '../icons/user';

@Component({
  selector: 'ngc-card',
  inputs: [
    'title',
    'content'
  ],
  directives: [CheckIcon, CloseIcon, UserIcon],
  styles: [STYLES],
  template: TEMPLATE
})
export default class Card {
}
