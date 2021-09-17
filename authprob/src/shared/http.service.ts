import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Router} from "@angular/router";
import {IUser} from "./interfaces";
import {User} from "./classes/user";

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  public subjectLg: Subject<boolean> = new Subject<boolean>();
  public $loggedIn = this.subjectLg.asObservable();

  public subjectUser: BehaviorSubject<User> = new BehaviorSubject<User>(User.me);
  public $subjectUser = this.subjectLg.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  public getToken(data:any): Observable<any>
  {
    return this.http.post<any>('http://localhost:8000/oauth/token', data);
  }

  public getUser(): Observable<IUser>
  {
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${localStorage.getItem('token')}`
    // });
    // {headers: headers}
    return this.http.get<IUser>('http://localhost:8000/user');
  }

  public registerUser(data: any): Observable<any>
  {
    return this.http.post('http://localhost:8000/register', data);
  }

  public refresh_token(data:any): Observable<any>
  {
      return this.http.post('http://localhost:8000/oauth/token/refresh ', data);
  }

  public show(): Observable<any>
  {
    return this.http.get('http://localhost:8000/show');
  }


}
