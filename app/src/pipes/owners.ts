import {Pipe, PipeTransform} from 'angular2/core';
import {TaskMap} from '../services/tasks-service'; 
import {List, Iterable, Seq} from 'immutable';

/* filters unique list of task owners */
@Pipe({ name: 'owners' })
export class OwnersPipe implements PipeTransform {
  transform(tasks: any): any {
    return  new Set<string>(
      tasks.map(n => n.get('owner'))
    );
    
  }
}

/* filters tasks by owner */
@Pipe({ name: 'ownerTasks' })
export class OwnerTasksPipe implements PipeTransform {
  transform(tasks: List<TaskMap>, args: string[]): List<TaskMap> {
    const owner = String(args[0]);  

    /* "everyone" owns all tasks */ 
    if (owner === 'everyone') {
      return tasks;
    }

    const tasksByOwner = tasks
      .filter(task => task.get('owner') === owner);

    /* .filter returns an Iterable 
     * so we are casting back to List
     * check out immutable.d.ts for more details
     */
    return <List<TaskMap>>tasksByOwner;
  }
}
