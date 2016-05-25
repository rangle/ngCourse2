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
import TaskEdit from './task-edit';
import {MockTasksService} from '../../mocks/mock-tasks-service';
import {MockRouterProvider} from '../../mocks/mock-router-provider';

describe('Testing Task Edit Component', () => {
  const _id = '1';
  const mockRouterProvider = new MockRouterProvider();
  mockRouterProvider.mockRouteParams.set('id', _id);
  const mockTasksService = new MockTasksService;

  beforeEachProviders(() => {
    return [
      mockTasksService.getProvider(),
      FormBuilder,
      mockRouterProvider.getProviders()
    ];
  });

  it('Input should be populated with task', async(inject(
    [TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb.createAsync(TaskEdit).then(
        (componentFixture: ComponentFixture<TaskEdit>) => {
          const element = componentFixture.nativeElement;
          const inputs = element.querySelectorAll('input');

          componentFixture.detectChanges();

          const task = mockTasksService.getById(_id);
          chai.expect(inputs[0].value).to.equal(task._id);
          chai.expect(inputs[1].value).to.equal(task.owner);
          chai.expect(inputs[2].value).to.equal(task.description);
        }
      );
    }
  )));

  it('Edit and save item should change the task', async(inject(
    [TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb.createAsync(TaskEdit).then(
        (componentFixture: ComponentFixture<TaskEdit>) => {
          const instance = componentFixture.debugElement.componentInstance;

          let controls = instance.taskEditForm.controls;
          controls.owner.updateValue('b');
          controls.description.updateValue('change task description');

          componentFixture.detectChanges();
          instance.onSubmit();

          const task = mockTasksService.getById(_id);
          chai.expect(task.owner).to.equal('b');
          chai.expect(task.description).to.equal('change task description');
        }
      );
    }
  )));
});
