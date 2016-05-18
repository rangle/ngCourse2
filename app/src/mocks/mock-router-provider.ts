import {provide} from '@angular/core';
import { 
  Location,
  LocationStrategy
} from '@angular/common';
import {
  ComponentInstruction,
  Router,
  RouteParams,
  RouterLink
} from '@angular/router-deprecated';
import {ResolvedInstruction} from '@angular/router-deprecated/src/instruction';

export class MockRouteParams {
  private ROUTE_PARAMS = {};

  constructor() { 
    //super(RouteParams); 
  }

  set(key: string, value: string) {
    this.ROUTE_PARAMS[key] = value;
  }

  get(key: string) {
    return this.ROUTE_PARAMS[key];
  }
}

export class MockRouter {
  constructor() { 
    //super(Router); 
  }
  
  isRouteActive(s) { return true; }
  
  generate(s) {
    return new ResolvedInstruction(
      new ComponentInstruction(
        'detail',
        [],
        null,
        null,
        true,
        '0',
        {},
        'detail'
      ),
      null,
      {}
    );
  }
}

export class MockLocationStrategy {
  constructor() { 
    //super(LocationStrategy); 
  }
}
export class MockLocation {
  constructor() { 
    //super(Location); 
  }
}
export class MockRouterLink {
  constructor() { 
    //super(RouterLink); 
  }
}

export class MockRouterProvider {
  mockRouter: MockRouter = new MockRouter();
  mockRouteParams: MockRouteParams = new MockRouteParams();
  mockLocationStrategy: MockLocationStrategy = new MockLocationStrategy();
  mockLocation: MockLocation = new MockLocation();
  mockRouterLink: MockRouterLink = new MockRouterLink();

  setRouteParam(key: string, value: any) {
    this.mockRouteParams.set(key, value);
  }

  getProviders(): Array<any> {
    return [
      provide(Router, {useValue: this.mockRouter}),
      provide(RouteParams, {useValue: this.mockRouteParams}),
      provide(Location, {useValue: this.mockLocation}),
      provide(LocationStrategy, {useValue: this.mockLocationStrategy}),
      provide(MockRouterLink, {useValue: this.mockRouterLink})
    ];
  }
}
