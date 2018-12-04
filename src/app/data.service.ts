import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Connecting to API use this service file
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // gerUsers() {
  //   return this.http.get('');
  // }
}
