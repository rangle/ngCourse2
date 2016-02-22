import {
  BaseRequestOptions,
  Response,
  ResponseOptions,
  ConnectionBackend,
  Http,
  RequestMethod
} from 'angular2/http';
import {
  it,
  describe,
  beforeEachProviders,
  inject,
  fakeAsync,
  tick
} from 'angular2/testing';
import {MockBackend} from 'angular2/http/testing';
import {provide} from 'angular2/core';
import TasksService from './tasks-service';
import {MockRouterProvider} from '../mocks/mock-router-provider';

describe("Testing Tasks Service", () => {
  let mockRouterProvider = new MockRouterProvider();
  const mockTasksResponse = [
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
    }
  ];

  beforeEachProviders(() => {
    return [
      MockBackend,
      BaseRequestOptions,
      TasksService,
      mockRouterProvider.getProviders(),
      provide(
        Http, {
          useFactory: (
            mockBackend: ConnectionBackend, defaultOptions: BaseRequestOptions
          ) => {
            return new Http(mockBackend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      )
    ];
  });

  function fetchTasks(mockResponseBody: any, callback: Function){
    return inject(
      [TasksService, MockBackend],
      fakeAsync((tasksService, mockBackend) => {

        mockBackend.connections.subscribe( conn => {

          chai.expect(conn.request.url).to.be.oneOf([
            'http://ngcourse.herokuapp.com/api/v1/tasks',
            'http://ngcourse.herokuapp.com/api/v1/tasks/1'
          ]);
          chai.expect(conn.request.method).to.be.oneOf([
            RequestMethod.Get,
            RequestMethod.Post,
            RequestMethod.Delete,
            RequestMethod.Put
          ]);

          if (conn.request.url ===
            'http://ngcourse.herokuapp.com/api/v1/tasks' &&
            conn.request.method === RequestMethod.Get) {
              let response = new ResponseOptions({body: mockTasksResponse});
              conn.mockRespond(new Response(response));
              return;
          }

          console.log(mockResponseBody);
          let response = new ResponseOptions({body: mockResponseBody});
          conn.mockRespond(new Response(response));
        });

        tasksService.fetch();
        tick();
        callback(tasksService);
      }
    ));
  }

  it('Fetch tasks', fetchTasks(null, (tasksService) => {
    chai.expect(tasksService.tasks.size).to.equal(2);
  }));

  it('Get By Id', fetchTasks(null, (tasksService) => {
    const task = tasksService.getById('1');
    chai.expect(task).to.deep.equal(mockTasksResponse[0]);
  }));

  const taskToBeAdded = {
    done: false,
    owner: 'a',
    description: 'task 2',
    _id: '3'
  };
  it('Add task', fetchTasks([taskToBeAdded], (tasksService) => {
    tasksService.add(taskToBeAdded);
    tick();

    chai.expect(tasksService.tasks.last()).to.deep.equal(taskToBeAdded);
  }));

  it("Delete Task", fetchTasks('1', (tasksService) => {
    tasksService.delete(mockTasksResponse[0]);
    tick();

    chai.expect(tasksService.tasks.size).to.equal(1);
  }));


  it('Update Task', fetchTasks(['1'], (tasksService) => {
    const updatedTask = mockTasksResponse[0];
    updatedTask.owner = 'b';
    updatedTask.description = 'updated';
    tasksService.update(updatedTask);
    tick();

    chai.expect(tasksService.tasks.get(0)).to.eql(updatedTask);
  }));
});
