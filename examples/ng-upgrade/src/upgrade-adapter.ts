// Angular Vendor Import
import { UpgradeAdapter } from "angular2/upgrade";

// Instantiate the adapter singleton
export const upgradeAdapter = new UpgradeAdapter();

// upgrade an Angular 1 component
export const a1Upgradable = upgradeAdapter.upgradeNg1Component("a1Upgradable");

// share an Angular service with AngularJS
import { A2DowngradeService } from "./services/a2-downgrade-service";
upgradeAdapter.addProvider(A2DowngradeService);

// share an AngularJS service with Angular
upgradeAdapter.upgradeNg1Provider("a1UpgradeService");
