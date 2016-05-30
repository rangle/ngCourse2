import {
  it,
  describe,
  inject,
  async,
  beforeEachProviders,
} from '@angular/core/testing';
import {
  TestComponentBuilder,
  ComponentFixture
} from '@angular/compiler/testing';
import TasksList from './tasks-list';
import {MockTasksService} from '../../mocks/mock-tasks-service';
import {MockRouterProvider} from '../../mocks/mock-router-provider';

describe('Testing Test List Component', () => {
  let mockRouterProvider = new MockRouterProvider();

  beforeEachProviders(() => {
    return [
      MockTasksService.getProvider(),
      mockRouterProvider.getProviders()
    ];
  });

  it('test tasks list component with a mock list', async(inject(
    [TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb.createAsync(TasksList).then(
        (componentFixture: ComponentFixture<TasksList>) => {
          const element = componentFixture.nativeElement;
          componentFixture.detectChanges();
          chai.expect(element.querySelectorAll('ngc-grid').length).to.equal(1);
          chai.expect(element.querySelectorAll('ngc-task').length).to.equal(3);
        }
      );
    }
  )));
});
