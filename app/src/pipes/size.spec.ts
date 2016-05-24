import {SizePipe} from './size';
import {
  describe,
  it,
  beforeEach
} from '@angular/core/testing';
import {List} from 'immutable';
import {Task} from '../services/tasks-service';

describe('SizePipe', () => {
  let sizePipe: SizePipe;

  beforeEach(() => {
    sizePipe = new SizePipe();
  });

  it('testing size pipe with empty list', () => {
    let size = sizePipe.transform(List([]));
    chai.expect(size).to.equal(0);
  });

  it('testing size pipe with a small list', () => {
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
    let size = sizePipe.transform(tasks);
    chai.expect(size).to.equal(3);
  });
});
