import {provide} from '@angular/core';
import {
  it,
  describe,
  inject,
  async,
  beforeEachProviders,
  fakeAsync,
  tick
} from '@angular/core/testing';
import {
  ComponentFixture,
  TestComponentBuilder
} from '@angular/compiler/testing';
import {FormBuilder} from '@angular/common';
import {MockTasksService} from '../../mocks/mock-tasks-service';
import TasksService from '../../services/tasks-service';
import TaskAdd from './task-add';
import {MockRouterProvider} from '../../mocks/mock-router-provider';

describe('Testing Add Task Component', () => {
  const mockRouterProvider = new MockRouterProvider();
  const mockTasksService = new MockTasksService;

  beforeEachProviders(() => {
    return [
      mockTasksService.getProvider(),
      FormBuilder,
      mockRouterProvider.getProviders()
    ];
  });

  it('Task should be added into service', async(inject(
    [TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb.createAsync(TaskAdd).then(
        (componentFixture: ComponentFixture<TaskAdd>) => {
          const instance = componentFixture.debugElement.componentInstance;

          let controls = instance.taskAddForm.controls;
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
  )));
});
