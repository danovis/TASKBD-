import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';


@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {

  task: Task;
  tasks:Task[];
  constructor(private taskService: TaskService) { }
  ngOnInit() {
    this.task = new Task();
  }

  add(): void {
    if (!this.task) { return; }
    this.taskService.addTask(this.task)
      .subscribe( newTask  => {
          alert('Se agrego una nueva tarea =>'+JSON.stringify(newTask.id));
             });
  }
}
