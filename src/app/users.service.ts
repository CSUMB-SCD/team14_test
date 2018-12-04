import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseURL = 'https://springbootusersdb.herokuapp.com/rest/users';
  mainUser: User;
  constructor(private http: HttpClient) {
    this.mainUser = null;
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL + '/all');
  }

  createUser(username: string, password: string): Observable<User> {
    return this.http.post<User>(this.baseURL + '/create', {
      userName: username,
      password: password
    });
  }

  updateUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseURL + '/update', user);
  }
}
