import { ItemsService } from './../items.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Item } from '../items';
import * as $ from 'jquery';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  totalPrice: number;
  inCorrectInfo: boolean;
  orderComplete: boolean;
  name: string;
  address: string;
  zip: string;
  city: string;
  state: string;
  confirmationCart: Item[];

  constructor(public userSVC: UsersService, private itemsSVC: ItemsService) {
    // console.log(userSVC.mainUser.cart.length);
    // this.totalPrice = 0;
    // for (const itm of this.userSVC.mainUser.cart) {
    //   this.totalPrice += (itm.price * itm.stock);
    // }
    this.inCorrectInfo = false;
    this.orderComplete = false;
  }
  ngOnInit() {
  }

  getTotal(cart: Item[]): number {
    this.totalPrice = 0;
    for (const itm of cart) {
      this.totalPrice += (itm.price * itm.stock);
    }

    return this.totalPrice;
  }

  removeItem(item: Item) {
    // tslint:disable-next-line:prefer-const
    let newCart: Item[] = [];

    for (const itm of this.userSVC.mainUser.cart) {
      if (item.id !== itm.id) {
        newCart.push(itm);
      }
    }
    this.userSVC.mainUser.cart = newCart;
    this.userSVC.updateUser(this.userSVC.mainUser).subscribe(data => {console.log(data); });
    alert('Item Removed');
  }

  checkout() {

    this.inCorrectInfo = false;

    if ($('#name').val() === '') {
      this.inCorrectInfo = true;
    } else if ($('#address').val() === '') {
      this.inCorrectInfo = true;
    } else if ($('#zip').val() === '') {
      this.inCorrectInfo = true;
    } else if ($('#cardnum').val() === '') {
      this.inCorrectInfo = true;
    } else if ($('#pin').val() === '') {
      this.inCorrectInfo = true;
    } else if ($('#city').val() === '') {
      this.inCorrectInfo = true;
    } else if ($('#state').val() === '') {
      this.inCorrectInfo = true;
    } else {
      // finish it

      this.name = String($('#name').val());
      this.address = String($('#address').val());
      this.zip = String($('#zip').val());
      this.city = String($('#city').val());
      this.state = String($('#state').val());

      this.confirmationCart = this.userSVC.mainUser.cart;

      for (const itm of this.userSVC.mainUser.cart) {
        for (const itmDB of this.itemsSVC.allItems) {
          if (itm.id === itmDB.id) {
            console.log('Item in DB' + itmDB.stock);
            console.log('Item in Cart' + itm.stock);
            itmDB.stock = (itmDB.stock - itm.stock);
            this.itemsSVC.updateItem(itmDB).subscribe(data => {console.log(data); });
            break;
          }
        }
      }
      this.userSVC.mainUser.cart = [] as Item[];
      this.userSVC.updateUser(this.userSVC.mainUser).subscribe(data => {console.log(data); });
      this.itemsSVC.itemRefresh();
      this.orderComplete = true;
    }
  }

  getConfirmNum(): number {
    return Math.floor(Math.random() * Math.floor(100000000));
  }

  reset() {
    this.inCorrectInfo = false;
    this.orderComplete = false;
    this.confirmationCart = [] as Item[];
    this.name = '';
    this.address = '';
    this.zip = '';
    this.city = '';
    this.state = '';
  }
}
