import {Pipe, PipeTransform} from 'angular2/core';
import {TaskMap} from '../services/tasks-service';
import {List} from 'immutable';

@Pipe({name: 'status'})
export class StatusPipe implements PipeTransform {
  transform(tasks: List<TaskMap>, args: string[]): List<TaskMap> {
    const taskStatus = String(args[0]);

    if (taskStatus === 'all') {
      return tasks;
    }
   
    const done = taskStatus === 'completed';
    const filtered = tasks.filter(task => 
      task.get('done') === done  
    );
    
    return <List<TaskMap>>filtered;
  }
}