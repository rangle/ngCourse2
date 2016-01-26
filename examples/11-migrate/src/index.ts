// Angular 1 Project Imports
import {exampleRoot} from './containers/example-root';
import {a1UpgradableDirective} from './components/a1-upgradable';
import {A2UsingA1Component} from './components/a2-using-a1-component';
import {A2DowngradeComponent} from './components/a2-downgrade';
import {a1UsingA2ServiceDirective} from './components/a1-using-a2-service';
import {A2DowngradeService} from './services/a2-downgrade-service';
import {A2UsingA1Service} from './components/a2-using-a1-service';
import {A1UpgradeService} from './services/a1-upgrade-service';
import {A2Projection} from './components/a2-projection';
import {a1ProjectionContentsDirective} from
  './components/a1-projection-contents';
import {A2Transclusion} from './components/a2-transclusion-contents';
import {a1TransclusionDirective} from './components/a1-transclusion';

// Angular 1 Vendor Import
import * as angular from 'angular';

// Import the upgradeAdapter singleton
import {upgradeAdapter} from './upgrade-adapter';

// Name the application
const APPNAME = 'angular-upgrade-example';

// Register classic Angular 1 modules
angular
  .module(APPNAME, [])
  .directive('exampleRoot', exampleRoot)
  .directive('a1Upgradable', a1UpgradableDirective)
  .directive('a2Downgrade',
    upgradeAdapter.downgradeNg2Component(A2DowngradeComponent))
  .directive('a2UsingA1',
    upgradeAdapter.downgradeNg2Component(A2UsingA1Component))
  .factory('a2DowngradeService',
    upgradeAdapter.downgradeNg2Provider(A2DowngradeService))
  .directive('a1UsingA2Service', a1UsingA2ServiceDirective)
  .directive('a2UsingA1Service',
    upgradeAdapter.downgradeNg2Component(A2UsingA1Service))
  .service('a1UpgradeService', A1UpgradeService)
  .directive('a2Projection',
    upgradeAdapter.downgradeNg2Component(A2Projection))
  .directive('a1ProjectionContent', a1ProjectionContentsDirective)
  .directive('a2TransclusionContents',
    upgradeAdapter.downgradeNg2Component(A2Transclusion))
  .directive('a1Transclusion', a1TransclusionDirective);

// Bootstrap Angular 1 manually
angular.bootstrap(document.body, [APPNAME]);

// Bootstrap Angular 2 - *note* this is asynchronous
upgradeAdapter.bootstrap(document.documentElement, [APPNAME], {strictDi: true});
