import LoginComponent from './login';
import {
  it,
  describe,
  injectAsync,
  TestComponentBuilder,
  beforeEachProviders,
  ComponentFixture
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {AuthService} from '../../services/auth-service';
import {FormBuilder} from 'angular2/common';
import {MockRouterProvider} from '../../mocks/mock-router-provider';

class MockSucessAuthService extends AuthService {
  login(user: string, password: string): boolean {
    return true;
  }
}

describe("Testing Login Component Success Flow", () => {
  let mockRouterProvider = new MockRouterProvider();

  beforeEachProviders(() => {
    return [
      provide(AuthService, {useClass: MockSucessAuthService}),
      mockRouterProvider.getProviders(),
      FormBuilder
    ];
  });

  it("Login should succeed", injectAsync([TestComponentBuilder],
      (tcb: TestComponentBuilder) => {
    return tcb.createAsync(LoginComponent).then(fixture => {
      const instance = fixture.debugElement.componentInstance;
      instance.login();
      chai.expect(instance.message).to.equal("");
    });
  }));
});

class MockFailedAuthService extends AuthService {
  login(user: string, password: string): boolean {
    return false;
  }
}

describe("Testing Login Component Failed Flow", () => {
  let mockRouterProvider = new MockRouterProvider();

  beforeEachProviders(() => {
    return [
      provide(AuthService, {useClass: MockFailedAuthService}),
      mockRouterProvider.getProviders(),
      FormBuilder
    ];
  });

  it("Login should fail", injectAsync([TestComponentBuilder],
      (tcb: TestComponentBuilder) => {
    return tcb.createAsync(LoginComponent).then(fixture => {
      const instance = fixture.debugElement.componentInstance;
      instance.login();
      chai.expect(instance.message).to.equal("Incorrect credentials.");
    });
  }));
});
