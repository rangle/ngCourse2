import {bootstrap}    from 'angular2/platform/browser';
import {Car} from './car-component';

import {Tires} from './Tires';
import {Body} from './Body';
import {Engine} from './Engine';


bootstrap(Car, [Tires, Body, Engine]);
