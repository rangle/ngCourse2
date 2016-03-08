import {Component} from 'angular2/core';
import {Router, RouterLink} from 'angular2/router';
import LogoIcon from '../icons/logo';

const TEMPLATE = require('./header.html');

@Component({
  selector: 'ngc-header',
  directives: [RouterLink, LogoIcon],
  template: TEMPLATE
})
export default class Header {

}
