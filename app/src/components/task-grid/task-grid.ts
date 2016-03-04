import {Component, View, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges} from 'angular2/core';
import Task from '../task-item/task-item';

@Component({
  selector: 'ngc-task-grid',
  directives: [Task],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="cols list-reset m0">
      <li class="py1 avoid-break"
        *ngFor="#task of tasks">
        <ngc-task 
          [task]="task"
          (taskDeleted)="taskDeleted.emit($event)"
          (taskMarked)="taskMarked.emit($event)"
          (taskEdit)="taskEdit.emit($event)"
          >
        </ngc-task>
      </li>
    </ul>
  `
})
export default class TaskGrid implements OnChanges {
  @Input() tasks: any;
  @Output() taskDeleted: EventEmitter<any> = new EventEmitter<any>();
  @Output() taskMarked: EventEmitter<any> = new EventEmitter<any>();
  @Output() taskEdit: EventEmitter<any> = new EventEmitter<any>();
   
   ngOnChanges(x) {
     console.log(x)
   }

   ngOnDestroy() {
     console.log('Destroy!')
   }
}
