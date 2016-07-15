import {provide} from '@angular/core';
import { 
  Location,
  LocationStrategy
} from '@angular/common';
import {
  Router,
  ActivatedRoute,
  RouterLink
} from '@angular/router';
import {Observable} from 'rxjs/Observable';

export class MockActivatedRoute {
  private ROUTE_PARAMS = {};

  constructor() { 
  }

  get params () {
    return new Observable(observer => {
        observer.next(this.ROUTE_PARAMS);
        observer.complete();
      })
  }

  set(key: string, value: string) {
    this.ROUTE_PARAMS[key] = value;
  }

  get(key: string) {
    return this.ROUTE_PARAMS[key];
  }
}

export class MockRouter  {
  constructor() {
  }
  
  navigate() {}

  subscribe() {}
}

export class MockLocationStrategy {
  constructor() { 
  }
}
export class MockLocation {
  constructor() { 
  }
  prepareExternalUrl() { }
}
export class MockRouterLink {
  constructor() { 
  }
}

export class MockRouterProvider {
  mockRouter: MockRouter = new MockRouter();
  mockActivatedRoute: MockActivatedRoute = new MockActivatedRoute();
  mockLocationStrategy: MockLocationStrategy = new MockLocationStrategy();
  mockLocation: MockLocation = new MockLocation();
  mockRouterLink: MockRouterLink = new MockRouterLink();

  setRouteParam(key: string, value: any) {
    this.mockActivatedRoute.set(key, value);
  }

  getProviders(): Array<any> {
    return [
      provide(Router, {useValue: this.mockRouter}),
      provide(ActivatedRoute, {useValue: this.mockActivatedRoute}),
      provide(Location, {useValue: this.mockLocation}),
      provide(LocationStrategy, {useValue: this.mockLocationStrategy}),
      provide(MockRouterLink, {useValue: this.mockRouterLink})
    ];
  }
}
