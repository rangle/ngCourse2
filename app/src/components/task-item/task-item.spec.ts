import TaskItem from './task-item';
import {provide} from 'angular2/core';
import {
  it,
  describe,
  injectAsync,
  TestComponentBuilder,
  beforeEachProviders,
  ComponentFixture,
  fakeAsync,
  tick
} from 'angular2/testing';
import {MockTasksService} from '../../mocks/mock-tasks-service';
import {MockRouterProvider} from '../../mocks/mock-router-provider';

describe('Testing Task Item Component', () => {
  const mockRouterProvider = new MockRouterProvider();
  const mockTasksService = new MockTasksService();
  const mockTask = mockTasksService.tasks.get(0);

  beforeEachProviders(() => {
    return [
      mockTasksService.getProvider(),
      mockRouterProvider.getProviders()
    ];
  });

  function populateTaskItem(callback) {
    return injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb.createAsync(TaskItem).then(
        (componentFixture: ComponentFixture) => {
          const instance = componentFixture.debugElement.componentInstance;
          instance.task = mockTask;
          componentFixture.detectChanges();
          callback(componentFixture);
        }
      );
    });
  }

  it('delete task', populateTaskItem((componentFixture: ComponentFixture) => {
    const instance = componentFixture.debugElement.componentInstance;
    chai.expect(mockTasksService.tasks.toJS()).to.include(mockTask);
    instance.deleteItem();

    chai.expect(mockTasksService.tasks.toJS()).to.not.include(mockTask);
  }));

  it('mark task done', populateTaskItem((componentFixture: ComponentFixture) => {
    const instance = componentFixture.debugElement.componentInstance;
    instance.mark(true);

    chai.expect(mockTasksService.getById(mockTask._id).done).to.equal(true);
  }));

  it('mark task imcomplete', populateTaskItem((componentFixture: ComponentFixture) => {
    const instance = componentFixture.debugElement.componentInstance;
    instance.mark(false);

    chai.expect(mockTasksService.getById(mockTask._id).done).to.equal(false);
  }));
});
