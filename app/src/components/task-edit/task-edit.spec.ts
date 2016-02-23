import TaskEdit from './task-edit';
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

  it('Input should be populated with task', injectAsync(
    [TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb.createAsync(TaskEdit).then(
        (componentFixture: ComponentFixture) => {
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
  ));

  it('Edit and save item should change the task', injectAsync(
    [TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb.createAsync(TaskEdit).then(
        (componentFixture: ComponentFixture) => {
          const instance = componentFixture.debugElement.componentInstance;

          let controls = instance.taskEditForm.controls
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
  ));
});
