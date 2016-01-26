// Angular 2 Vendor Import
import {UpgradeAdapter} from 'angular2/upgrade';

// Instantiate the adapter singleton
export const upgradeAdapter = new UpgradeAdapter();

// upgrade an Angular 1 component
export const a1Upgradable = upgradeAdapter.upgradeNg1Component('a1Upgradable');

// share an Angular 2 service with Angular 1
import {A2DowngradeService} from './services/a2-downgrade-service'
upgradeAdapter.addProvider(A2DowngradeService);

// share an Angular 1 servie with Angular 2
upgradeAdapter.upgradeNg1Provider('a1UpgradeService');
