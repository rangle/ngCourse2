import TasksList from './tasks-list';
import {
  it,
  describe,
  injectAsync,
  TestComponentBuilder,
  beforeEachProviders,
  ComponentFixture
} from 'angular2/testing';
import {MockTasksService} from '../../mocks/mock-tasks-service';
import {MockRouterProvider} from '../../mocks/mock-router-provider';

describe("Testing Test List Component", () => {
  let mockRouterProvider = new MockRouterProvider();

  beforeEachProviders(() => {
    return [
      MockTasksService.getProvider(),
      mockRouterProvider.getProviders()
    ];
  });

  it("tasks list with mock list", injectAsync(
    [TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb.createAsync(TasksList).then(
        (componentFixture: ComponentFixture) => {
          const element = componentFixture.nativeElement;
          componentFixture.detectChanges();
          chai.expect(element.querySelectorAll('ngc-grid').length).to.equal(1);
          chai.expect(element.querySelectorAll('ngc-task').length).to.equal(3);
        }
      );
    }
  ));
});
