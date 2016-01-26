import {Pipe, PipeTransform} from 'angular2/core';
import {Task} from '../services/tasks-service'; 
import {List} from 'immutable';

/* filters unique list of task owners */
@Pipe({ name: 'owners' })
export class OwnersPipe implements PipeTransform {
  transform(tasks: List<Task>): List<string> {
     const owners = tasks.reduce((result, task) =>
       result.includes(task.owner) ? 
       result : result.push(task.owner), 
     List<string>());

    return owners;
  }
}

/* filters tasks by owner */
@Pipe({ name: 'ownerTasks' })
export class OwnerTasksPipe implements PipeTransform {
  transform(tasks: List<Task>, args: string[]): List<Task> {
    const owner = String(args[0]);  

    /* "everyone" owns all tasks */ 
    if (owner === 'everyone') {
      return tasks;
    }

    const tasksByOwner = tasks
      .filter(task => task.owner === owner);

    /* .filter returns an Iterable 
     * so we have to explicitly convert back to a List
     * check out immutable.d.ts for more details
     */
    return tasksByOwner.toList();
  }
}
