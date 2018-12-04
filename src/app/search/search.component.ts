import { HttpClient } from '@angular/common/http';
import { ItemsService } from './../items.service';
import { Component, OnInit } from '@angular/core';
import { Item } from '../items';
import { UsersService } from '../users.service';
import * as $ from 'jquery';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // allItems: Item[];
  constructor(public itemSVC: ItemsService, private userSVC: UsersService, private router: Router) {
    // this.itemsvc.getAllItems().subscribe(data => {
    //   this.allItems = data;
    //   let a = 0;
    //   for (a; a < this.allItems.length; a++) {
    //     this.allItems[a].quant_arr = Array(this.allItems[a].stock).fill(1).map((x, i) => i + 1);
    //   }
    // });
  }

  ngOnInit() {
    this.itemSVC.itemRefresh();
  }

  detailPageRedirect(item: Item) {
    this.itemSVC.showItemDetail = item;
    this.router.navigate(['/details']);
  }

  addToCart(item: Item) {
    if (this.userSVC.mainUser != null) {
      console.log(item.id);
      const quant = $('#' + item.id).val();
      let updated =  false;
      for (const itm of this.userSVC.mainUser.cart) {
        if (itm.id === item.id) {
          itm.stock = Number(quant);
          // item.totalPrice = item.price * Number(quant);
          updated = true;
          this.userSVC.updateUser(this.userSVC.mainUser).subscribe(data => {console.log(data); });
          break;
        }
      }

      if (!updated) {
        // item.stock = Number(quant);
        // item.totalPrice = item.price * Number(quant);
        // tslint:disable-next-line:prefer-const
        let tempItm: Item = {} as Item;
        tempItm.id = item.id;
        tempItm.description = item.description;
        tempItm.image = item.image;
        tempItm.name = item.name;
        tempItm.price = item.price;
        tempItm.stock = Number(quant);
        this.userSVC.mainUser.cart.push(tempItm);
        this.userSVC.updateUser(this.userSVC.mainUser).subscribe(data => {console.log(data); });
      }
    } else {
      alert('Login - In To Add Items To Cart');
    }
  }

}
