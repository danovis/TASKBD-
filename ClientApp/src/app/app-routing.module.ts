import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskAddComponent } from '../app/task-add/task-add.component';
import { TaskListComponent } from '../app/task-list/task-list.component';
import { TaskEditComponent } from './task-edit/task-edit.component';



const routes: Routes = [
  { path: 'taskAdd', component: TaskAddComponent, },
  { path: 'taskList', component: TaskListComponent },
  { path: 'taskEdit/:id', component: TaskEditComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
