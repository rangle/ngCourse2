declare const require: any;

import { setBaseTestProviders } from 'angular2/testing';
import { TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS } from 'angular2/platform/testing/browser';
setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS);

let testContext = (<{ context?: Function }>require).context('./', true, /\.spec\.ts/);
testContext.keys().forEach(testContext);
