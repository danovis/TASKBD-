import { Injectable , Inject} from '@angular/core';
import { Task } from '../models/task';
import { Observable, of ,observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor( private http:HttpClient, @Inject('BASE_URL') private baseUrl:string  ) { }

  /** POST: add a new task to the server */
    addTask (task: Task): Observable<Task> {
     return this.http.post<Task>(this.baseUrl+'api/task', task, httpOptions).pipe(
     tap((newTask) => this.log(`added NewTask w/ id=${newTask.id}`)),
     catchError(this.handleError<Task>('addTask'))
     );
  }

/** GET Task from the server */
    getAll():Observable<Task[]>
     {
        return this.http.get<Task[]>(this.baseUrl+'api/Task').pipe(
        tap(_=>this.log('Se Consulta la información')),
        catchError(this.handleError<Task[]>('getAll',[]))
      );
}

/** GET task by id. Will 404 if id not found */
  get(id: number): Observable<Task>
   {
     const url = `${this.baseUrl + 'api/Task'}/${id}`;
     return this.http.get<Task>(url).pipe(
     tap(_ => this.log(`fetched task id=${id}`)),
     catchError(this.handleError<Task>(`getHero id=${id}`))
     );
}

/** PUT: update the Task on the server */
update (task: Task): Observable<any> {
  const url =
  
    `${this.baseUrl + 'api/Task'}/${task.id}`;
    return this.http.put(url, task, httpOptions).pipe(
    tap(_ => this.log(`updated task id=${task.id}`)),
    catchError(this.handleError<any>('task'))
    );
  }

   /** DELETE: delete the task from the server */
    delete (task: Task | number): Observable<Task> {
      const id = typeof task === 'number' ? task : task.id;
      const url =
  
     `${this.baseUrl + 'api/Task'}/${id}`;
  
     return this.http.delete<Task>(url, httpOptions).pipe(
     tap(_ => this.log(`deleted task id=${id}`)),
     catchError(this.handleError<Task>('deleteTask'))
     );
  }


  
    private handleError<T> (operation = 'operation', result?: T) {
       return (error: any): Observable<T> => {
       console.error(error);
       this.log(`${operation} failed: ${error.message}`);
       return of(result as T);
       };
      }
  

      private log(message: string) {
        alert(`TaskService: ${message}`);
        }


}
