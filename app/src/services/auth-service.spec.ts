import {
  BaseRequestOptions,
  Response,
  ResponseOptions,
  ConnectionBackend,
  Http
} from 'angular2/http';

import {
  it,
  expect,
  describe,
  beforeEachProviders,
  inject
} from 'angular2/testing';

import {MockBackend} from 'angular2/http/testing';
import {provide} from 'angular2/core';
import {AuthService} from './auth-service';

describe('Testing authentication service', () => {
  beforeEachProviders(() => {
    return [
      MockBackend,
      BaseRequestOptions,
      AuthService,
      provide(
        Http, {
          useFactory: (
            mockBackend: ConnectionBackend, defaultOptions: BaseRequestOptions
          ) => {
            return new Http(mockBackend, defaultOptions)
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      )
    ];
  });

  it('login follow', inject([ AuthService ], (authService) => {
    let invalidUser = authService.login('test', 'test');
    chai.expect(invalidUser).to.equal(false);

    let validUser = authService.login('user', 'pass');
    chai.expect(validUser).to.equal(true);

    chai.expect(authService.isLoggedIn()).to.equal(true);
    chai.expect(authService.getUser()).to.equal('user');

    authService.logout();

    chai.expect(authService.isLoggedIn()).to.equal(false);
  }));
});
