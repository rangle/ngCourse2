import {
  BaseRequestOptions,
  Response,
  ResponseOptions,
  ConnectionBackend,
  Http
} from '@angular/http';

import {
  it,
  expect,
  describe,
  beforeEachProviders,
  inject
} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {provide} from '@angular/core';
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
