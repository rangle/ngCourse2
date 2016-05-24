import {Pipe, PipeTransform} from '@angular/core';
import {Task} from '../services/tasks-service';
import {List} from 'immutable';

@Pipe({name: 'status'})
export class StatusPipe implements PipeTransform {
  transform(tasks: List<Task>, taskStatus: string): List<Task> {
    if (taskStatus === 'all') {
      return tasks;
    }
   
    const done = taskStatus === 'completed';
    const filtered = tasks.filter(task => 
      task.done === done  
    );
    
    return filtered.toList();
  }
}
