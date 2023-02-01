import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tasks } from 'src/app/Tasks';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-task-item',
    templateUrl: './task-item.component.html',
    styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent {
    @Input() task!: Tasks;
    
    /**
     * When outputting an Event Emitter onDeleteTask will be an EVENT like onClick
     * so on the parent component we can call onDeleteTask as an event. 
     * So when onDelete is called here which is when we press the stupid button
     * we emit the onDeleteTask event with task as the parameter
     * And then in parent component we have a function bined to (onDeleteTask)="deleteTask(task)"
     * and so whenever we emit the event from here, it triggers the deleteTask funcction in parent component.
     */
    @Output() onDeleteTask: EventEmitter<Tasks> = new EventEmitter();
    @Output() onToggleReminder: EventEmitter<Tasks> = new EventEmitter();
    
    faTimes = faTimes;

    onDelete(task: Tasks): void {
        this.onDeleteTask.emit(task);
    }

    onToggle(task: Tasks): void {
        this.onToggleReminder.emit(task);
    }
}
