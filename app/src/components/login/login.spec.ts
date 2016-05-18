import {
  it,
  describe,
  async,
  inject,
  beforeEachProviders
} from '@angular/core/testing';
import { 
  TestComponentBuilder,
  ComponentFixture 
} from '@angular/compiler/testing';
import {provide} from '@angular/core';
import {AuthService} from '../../services/auth-service';
import {FormBuilder} from '@angular/common';
import LoginComponent from './login';
import {MockRouterProvider} from '../../mocks/mock-router-provider';

class MockSucessAuthService extends AuthService {
  login(user: string, password: string): boolean {
    return true;
  }
}

describe('Testing Login Component Success Flow', () => {
  let mockRouterProvider = new MockRouterProvider();

  beforeEachProviders(() => {
    return [
      provide(AuthService, {useClass: MockSucessAuthService}),
      mockRouterProvider.getProviders(),
      FormBuilder
    ];
  });

  it('Login should succeed', async(inject([TestComponentBuilder],
    (tcb: TestComponentBuilder) => {
      return tcb.createAsync(LoginComponent)
        .then(fixture => {
          const instance = fixture.debugElement.componentInstance;
          instance.login();
          chai.expect(instance.message).to.equal('');
        });
      }))
  );
});

class MockFailedAuthService extends AuthService {
  login(user: string, password: string): boolean {
    return false;
  }
}

describe('Testing Login Component Failed Flow', () => {
  let mockRouterProvider = new MockRouterProvider();

  beforeEachProviders(() => {
    return [
      provide(AuthService, {useClass: MockFailedAuthService}),
      mockRouterProvider.getProviders(),
      FormBuilder
    ];
  });

  it('Login should fail', async(inject([TestComponentBuilder],
    (tcb: TestComponentBuilder) => {
      return tcb.createAsync(LoginComponent).then(fixture => {
        const instance = fixture.debugElement.componentInstance;
        instance.login();
        chai.expect(instance.message).to.equal('Incorrect credentials.');
      });
    })));
});
