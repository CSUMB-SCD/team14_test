import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './items';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private baseURL = 'https://springbootitemsdb.herokuapp.com/items';
  showItemDetail: Item;
  allItems: Item[];

  constructor(private http: HttpClient) {
    this.getAllItems().subscribe(data => {
      this.allItems = data;
      let a = 0;
      for (a; a < this.allItems.length; a++) {
        this.allItems[a].quant_arr = Array(this.allItems[a].stock).fill(1).map((x, i) => i + 1);
      }
    });
   }

  // ngOnInit() {
  //   setInterval(, 250);
  // }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.baseURL + '/all');
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.baseURL + '/update', item);
  }

  itemRefresh() {
    this.getAllItems().subscribe(data => {
      this.allItems = data;
      let a = 0;
      for (a; a < this.allItems.length; a++) {
        this.allItems[a].quant_arr = Array(this.allItems[a].stock).fill(1).map((x, i) => i + 1);
      }
    });
  }
}
