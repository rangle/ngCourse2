import TasksList from './tasks-list';
import {
  it,
  describe,
  injectAsync,
  TestComponentBuilder,
  beforeEachProviders,
  ComponentFixture
} from 'angular2/testing';
import {provide} from 'angular2/core';
import TasksService, {Task} from '../../services/tasks-service';
import {List} from 'immutable';

class MockTasksService {
  get tasks() {
    let tasks = List([
    {
      done: false,
      owner: 'a',
      description: 'task 1',
      _id: '1'
    }, {
      done: false,
      owner: 'a',
      description: 'task 2',
      _id: '2'
    }, {
      done: false,
      owner: "a",
      description: 'task 3',
      _id: '3'
    }]);
    return tasks;
  }

  get owner() {
    return 'everyone';
  }

  get taskStatus() {
    return 'all';
  }
}

describe("Testing Test List Component", () => {

  beforeEachProviders(() => {
    return provide(TasksService, {useClass: MockTasksService});
  });

  it("tasks list with mock list", injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb.createAsync(TasksList).then((componentFixture: ComponentFixture) => {
      const element = componentFixture.nativeElement;
      chai.expect(element.querySelectorAll('ngc-grid').length).to.equal(1);
      //chai.expect(element.querySelectorAll('ngc-task').length).to.equal(3);
    });
  }));
});
