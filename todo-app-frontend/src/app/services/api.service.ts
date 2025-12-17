import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Project, Task } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8911/api';

  constructor(private http: HttpClient) {}


  
  test(): Observable<string> {
    return this.http.get(`${this.baseUrl}/auth/test`, { responseType: 'text' });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, { email, password }).pipe(
      catchError(error => throwError(() => error))
    );
  }

  register(user: { email: string; password: string; name: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, user).pipe(
      catchError(error => throwError(() => error))
    );
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/projects`).pipe(
      catchError(error => throwError(() => error))
    );
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/projects/${id}`).pipe(
      catchError(error => throwError(() => error))
    );
  }

  createProject(project: { title: string; description?: string }): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}/projects`, project).pipe(
      catchError(error => throwError(() => error))
    );
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/projects/${id}`).pipe(
      catchError(error => throwError(() => error))
    );
  }

  getProjectProgress(id: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/projects/${id}/progress`).pipe(
      catchError(error => throwError(() => error))
    );
  }

 
  
  getTasks(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks/${projectId}`).pipe(
      catchError(error => throwError(() => error))
    );
  }

  createTask(projectId: number, task: { title: string; description?: string; dueDate?: string }): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/tasks/${projectId}`, task).pipe(
      catchError(error => throwError(() => error))
    );
  }

  completeTask(taskId: number): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/tasks/complete/${taskId}`, {}).pipe(
      catchError(error => throwError(() => error))
    );
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tasks/${taskId}`).pipe(
      catchError(error => throwError(() => error))
    );
  }
}