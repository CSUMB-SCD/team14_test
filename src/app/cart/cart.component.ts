import { ItemsService } from './../items.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Item } from '../items';
import * as $ from 'jquery';
import { Router } from '@angular/router';


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
  inValidQuant: boolean;

  constructor(public userSVC: UsersService, private itemsSVC: ItemsService, private router: Router) {
    // console.log(userSVC.mainUser.cart.length);
    // this.totalPrice = 0;
    // for (const itm of this.userSVC.mainUser.cart) {
    //   this.totalPrice += (itm.price * itm.stock);
    // }
    this.inCorrectInfo = false;
    this.orderComplete = false;
    this.inValidQuant = false;
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

  getItemStock(id: string): number {
    for (const itm of this.itemsSVC.allItems) {
      if (itm.id === id) {
        return itm.stock;
      }
    }
  }

  updateCart(id: string) {
    if (this.userSVC.mainUser != null) {

      const quant = Number($('#add').val());
      let updated =  false;

      for (const itm of this.itemsSVC.allItems) {
        if (itm.id === id) {
          this.itemsSVC.showItemDetail = itm;
          break;
        }
      }


      if (quant <= 0 || quant > this.itemsSVC.showItemDetail.stock) {
        this.inValidQuant = true;
      } else {
        this.inValidQuant = false;
      }

      if (!this.inValidQuant) {
        for (const itm of this.userSVC.mainUser.cart) {
          if (itm.id === this.itemsSVC.showItemDetail.id) {
            itm.stock = Number(quant);
            // item.totalPrice = item.price * Number(quant);
            updated = true;
            this.userSVC.updateUser(this.userSVC.mainUser).subscribe(data => {console.log(data); });
            alert('Cart Updated');
            break;
          }
        }
      }

      if (!updated && !this.inValidQuant) {
        // item.stock = Number(quant);
        // item.totalPrice = item.price * Number(quant);
        // tslint:disable-next-line:prefer-const
        let tempItm: Item = {} as Item;
        tempItm.id = this.itemsSVC.showItemDetail.id;
        tempItm.description = this.itemsSVC.showItemDetail.description;
        tempItm.image = this.itemsSVC.showItemDetail.image;
        tempItm.name = this.itemsSVC.showItemDetail.name;
        tempItm.price = this.itemsSVC.showItemDetail.price;
        tempItm.stock = quant;
        this.userSVC.mainUser.cart.push(tempItm);
        this.userSVC.updateUser(this.userSVC.mainUser).subscribe(data => {console.log(data); });
        alert('Cart Updated');
      }
    } else {
      alert('Login - In To Add Items To Cart');
    }
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

  detailPageRedirect(item: Item) {
    this.itemsSVC.showItemDetail = item;
    this.router.navigate(['/details']);
  }
}
