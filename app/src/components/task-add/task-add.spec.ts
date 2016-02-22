import TaskAdd from './task-add';
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
import {FormBuilder} from 'angular2/common';
import TasksService from '../../services/tasks-service';
import {MockRouterProvider} from '../../mocks/mock-router-provider';

describe("Testing Add Task Component", () => {
  const mockRouterProvider = new MockRouterProvider();
  const mockTasksService = new MockTasksService;

  beforeEachProviders(() => {
    return [
      mockTasksService.getProvider(),
      FormBuilder,
      mockRouterProvider.getProviders()
    ];
  });

  it("Task should be added into service", injectAsync(
    [TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb.createAsync(TaskAdd).then(
        (componentFixture: ComponentFixture) => {
          const instance = componentFixture.debugElement.componentInstance;

          let controls = instance.taskAddForm.controls
          controls.owner.updateValue('new owner');
          controls.description.updateValue('new task');

          componentFixture.detectChanges();
          instance.onSubmit();

          const task = mockTasksService.getById('4');
          chai.expect(task.owner).to.equal('new owner');
          chai.expect(task.description).to.equal('new task');
        }
      );
    }
  ));
});
