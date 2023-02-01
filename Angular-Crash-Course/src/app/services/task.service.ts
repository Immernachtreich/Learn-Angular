import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Tasks } from '../Tasks';

const httpOptions = {
    headers: new HttpHeaders({
        'content-type': 'application/json'
    })
}

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private URL = 'http://localhost:5000/tasks';

    constructor(private http: HttpClient) {}

    getTasks(): Observable<Tasks[]> {
        return this.http.get<Tasks[]>(this.URL);
    }

    deleteTask(task: Tasks): Observable<Tasks> {
        const url = this.URL + '/' + task.id;

        return this.http.delete<Tasks>(url);
    }

    updateTaskReminder(task: Tasks): Observable<Tasks> {
        const url = this.URL + '/' + task.id;

        return this.http.put<Tasks>(url, task, httpOptions);
    }
}
