import {bootstrap} from '@angular/platform-browser-dynamic';
import {Car} from './car-component';

import {Tires} from './Tires';
import {Body} from './Body';
import {Engine} from './Engine';


bootstrap(Car, [Tires, Body, Engine]);
