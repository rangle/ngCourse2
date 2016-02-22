import {OwnersPipe, OwnerTasksPipe} from './owners'
import {
  describe,
  it,
  beforeEach
} from 'angular2/testing';
import {List} from 'immutable';
import {Task} from '../services/tasks-service';

describe('OwnersPipe', () => {
  let ownersPipe: OwnersPipe;

  beforeEach(() => {
    ownersPipe = new OwnersPipe();
  });

  it('filter tasks for one owner', () => {
    let tasks: List<Task> = List([
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
    let owners = ownersPipe.transform(tasks);
    chai.expect(owners.size).to.equal(1);
    chai.expect(owners.get(0)).to.equal('a');
  });

  it('filter tasks for multiple owners', () => {
    let tasks: List<Task> = List([
    {
      done: false,
      owner: 'a',
      description: 'task 1',
      _id: '1'
    }, {
      done: false,
      owner: 'b',
      description: 'task 2',
      _id: '2'
    }, {
      done: false,
      owner: "c",
      description: 'task 3',
      _id: '3'
    }]);
    let owners = ownersPipe.transform(tasks);
    chai.expect(owners.size).to.equal(3);
    chai.expect(owners.get(0)).to.equal('a');
    chai.expect(owners.get(1)).to.equal('b');
    chai.expect(owners.get(2)).to.equal('c');
  });
});

describe('OwnerTasksPipe', () => {
  let ownerTasksPipe: OwnerTasksPipe;

  beforeEach(() => {
    ownerTasksPipe = new OwnerTasksPipe();
  });

  it('filter tasks', () => {
    let tasks: List<Task> = List([
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
      owner: "b",
      description: 'task 3',
      _id: '3'
    }]);
    let filteredTasksEveryone = ownerTasksPipe.transform(tasks, ['everyone']);
    chai.expect(filteredTasksEveryone.size).to.equal(3);

    let filteredTasksA = ownerTasksPipe.transform(tasks, ['a']);
    chai.expect(filteredTasksA.size).to.equal(2);

    let filteredTasksB = ownerTasksPipe.transform(tasks, ['b']);
    chai.expect(filteredTasksB.size).to.equal(1);
  });
});
