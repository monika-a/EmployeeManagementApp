import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import {Employee} from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl: string = 'http://localhost:3000/employee/'; 
  constructor(private messageService: MessageService, private http: HttpClient) { }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, employee).pipe(
      tap((newEmployee: Employee) => this.log(`Created Employee Record at Id '${newEmployee.id}'`)),
      catchError(this.handleError<Employee>('Create Employee')));
  };

  readEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.baseUrl + '/' + id).pipe(
      catchError(this.handleError<Employee>(`Read Employee Id '${id}'`)));
  };

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(this.baseUrl + '/' + employee.id, employee).pipe(
      tap(_ => this.log(`Updated Employee Id '${employee.id}' Details`)),
      catchError(this.handleError<any>(`Update Employee Id '${employee.id}'`)));
  };

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + id).pipe(
      tap(_ => this.log(`Deleted Employee Record Id '${id}'`)),
      catchError(this.handleError<any>(`Delete Employee Id '${id}'`)));
  };

  private log(message: string) {
    this.messageService.add(`${message}`);
  };

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
    private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => { 
      
      if (error.error instanceof ErrorEvent) {  
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
        this.log(`${operation} failed: ${error.error.message}`); // error for user consumption
        } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.text}`);
        this.log(`${operation} failed: ${error.error.text}`); // error for user consumption
      }
      // Let the app keep running by returning an empty result.
      return of(result as T);  
    };
  }

}