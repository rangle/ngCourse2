import {Pipe, PipeTransform} from 'angular2/core';
import {Task} from '../services/tasks-service';
import {List} from 'immutable';

@Pipe({name: 'status'})
export class StatusPipe implements PipeTransform {
  transform(tasks: List<Task>, args: string[]): List<Task> {
    const taskStatus = String(args[0]);

    if (taskStatus === 'all') {
      return tasks;
    }
   
    /* incomplete notes don't have a "done" property */
    const done = taskStatus === 'completed' || undefined;
    const filtered = tasks.filter(task => 
      task.done === done  
    );
    
    return filtered.toList();
  }
}
