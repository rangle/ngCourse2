# TestBed Configuration (Optional)

As you will see in [Testing Components](handout/testing/components/README.md), real-world component testing often relies on the Angular2 testing utility `TestBed`, which requires some configuration. Most significantly, we need to use `TestBed.initTestEnvironment` to create a testing platform before we can use unit tests with `TestBed`. This testing environment would have to be created, destroyed and reset as appropriate before every unit test.

In the angular2-redux-starter, this configuration is done in a [`tests.configure.ts`](https://github.com/rangle/angular2-redux-example/blob/master/src/tests.configure.ts) file and imported into every unit test for easy re-use.

```ts
import {
  getTestBed,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';

import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

export const configureTests = (configure: (testBed: TestBed) => void) => {
  const testBed = getTestBed();

  if (testBed.platform == null) {
    testBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting());
  }

  testBed.configureCompiler({
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true},
      ]
    });

  configure(testBed);

  return testBed.compileComponents().then(() => testBed);
};
```

`tests.configure.ts` creates the testing platform if it doesn't already exist, compiles the template, and exports `configureTests` which can then be imported and used in our unit tests.

Here's a look at how it would be used:

```ts
import { TestBed } from '@angular/core/testing';
import { ExampleComponent } from './index';
import { configureTests } from '../../tests.configure';
import { AppModule } from '../../modules/app.module';

describe('Component: Example', () => {
  let fixture;

  beforeEach(done => {
    const configure = (testBed: TestBed) => {
      testBed.configureTestingModule({
        imports: [AppModule],
      });
    };

    configureTests(configure).then(testBed => {
      fixture = testBed.createComponent(ExampleComponent);
      fixture.detectChanges();
      done();
    });
  });
  ```
