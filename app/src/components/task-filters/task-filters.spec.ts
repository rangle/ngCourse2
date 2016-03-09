import TaskFilters from './task-filters';
import {
  it,
  describe,
  injectAsync,
  TestComponentBuilder,
  beforeEachProviders,
  ComponentFixture
} from 'angular2/testing';
import {MockTasksService} from '../../mocks/mock-tasks-service';

describe('Testing Task Filter Component', () => {
  let mockTasksService = new MockTasksService();

  beforeEachProviders(() => {
    return MockTasksService.getProvider();
  });

  it(
    'chnage owner and status should update service',
    injectAsync(
      [TestComponentBuilder],
      (tcb: TestComponentBuilder) => {
        return tcb.createAsync(TaskFilters).then(
          (componentFixture: ComponentFixture) => {
            const instance = componentFixture.debugElement.componentInstance;

            const tasksService = instance.tasksService;

            instance.selectOwner({target: {value: 'a'}});
            chai.expect(tasksService.owner).to.equal('a');

            instance.selectOwner({target: {value: 'everyone'}});
            chai.expect(tasksService.owner).to.equal('everyone');

            instance.selectStatus({target: {value: 'completed'}});
            chai.expect(tasksService.taskStatus).to.equal('completed');

            instance.selectStatus({target: {value: 'all'}});
            chai.expect(tasksService.taskStatus).to.equal('all');
        });
      }
    )
  );
});
