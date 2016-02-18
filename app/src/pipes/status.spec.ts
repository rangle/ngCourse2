import {StatusPipe} from './status'
import {
  describe,
  it,
  beforeEach
} from 'angular2/testing';
import {List} from 'immutable';
import {Task} from '../services/tasks-service';

describe('StatusPipe', () => {
  let statusPipe: StatusPipe;

  beforeEach(() => {
    statusPipe = new StatusPipe();
  });

  it('filter tasks by status', () => {
    let tasks: List<Task> = List([
    {
      done: false,
      owner: 'a',
      description: 'task 1',
      _id: '1'
    }, {
      done: true,
      owner: 'a',
      description: 'task 2',
      _id: '2'
    }, {
      done: false,
      owner: "a",
      description: 'task 3',
      _id: '3'
    }]);
    let tasksAll = statusPipe.transform(tasks, ["all"]);
    chai.expect(tasksAll.size).to.equal(3);

    let tasksCompleted = statusPipe.transform(tasks, ["completed"]);
    chai.expect(tasksCompleted.size).to.equal(1);

    let tasksIncomplete = statusPipe.transform(tasks, ["incomplete"]);
    chai.expect(tasksIncomplete.size).to.equal(2);
  });
});
