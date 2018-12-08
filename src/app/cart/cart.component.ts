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
  checkoutOut: boolean;

  og_checkout_total: number;
  checkout_total: string;
  confirm_num: number;
  select_quantity = Array(10).fill(0).map((x, i) => i + 1);

  constructor(public userSVC: UsersService, private itemsSVC: ItemsService, private router: Router) {
    // console.log(userSVC.mainUser.cart.length);
    // this.totalPrice = 0;
    // for (const itm of this.userSVC.mainUser.cart) {
    //   this.totalPrice += (itm.price * itm.stock);
    // }
    this.inCorrectInfo = false;
    this.orderComplete = false;
    this.inValidQuant = false;
    this.checkoutOut = false;
  }
  ngOnInit() {
    this.og_checkout_total = this.getTotal(this.userSVC.mainUser.cart);
    this.checkout_total = this.og_checkout_total.toFixed(2);
  }

  hitCheckOut() {
    this.checkoutOut = true;
    this.confirm_num = Math.floor(Math.random() * Math.floor(100000000));
  }

  applyPromo() {
    const passed_in_promo = $('#promo').val();
    const is_promo_3 = passed_in_promo === 'a3wouldbegreat';
    const is_promo_2 = passed_in_promo === '2isokaytoo';

    console.log('Promo: ', passed_in_promo);

    if (is_promo_3) {
      this.checkout_total = '0.00';
    } else if (is_promo_2) {
      const num = this.og_checkout_total / 2;
      this.checkout_total = num.toFixed(2);
    } else {
      this.checkout_total = this.og_checkout_total.toFixed(2);
    }
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

  // checkStm(): boolean {
  //   return this.userSVC.mainUser !== null && this.userSVC.mainUser.cart.length > 0 && this.orderComplete ===
  //   false && this.checkout !== false && this.checkoutOut !== false;
  // }

  getItemStock(id: string): number {
    for (const itm of this.itemsSVC.allItems) {
      if (itm.id === id) {
        return itm.stock;
      }
    }
  }

  updateCart(id: string) {
    if (this.userSVC.mainUser != null) {

      const quant = Number($('#add' + id).val());
      let updated =  false;

      for (const itm of this.itemsSVC.allItems) {
        if (itm.id === id) {
          this.itemsSVC.showItemDetail = itm;
          console.log(this.itemsSVC.showItemDetail.stock);
          break;
        }
      }

      console.log(quant);

      if (quant <= 0 || quant > this.itemsSVC.showItemDetail.stock) {
        this.inValidQuant = true;
      } else {
        this.inValidQuant = false;
      }

      if (this.inValidQuant === false) {
        console.log('HERE');
        for (const itm of this.userSVC.mainUser.cart) {
          if (itm.id === this.itemsSVC.showItemDetail.id) {
            itm.stock = Number(quant);
            // item.totalPrice = item.price * Number(quant);
            updated = true;
            this.userSVC.updateUser(this.userSVC.mainUser).subscribe(data => {console.log(data); });
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
      this.checkoutOut = false;
    }
  }

  getConfirmNum(): number {
    return this.confirm_num;
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

  onGIF() {
    this.router.navigate(['/signin']);
  }

  onEmptyCart() {
    this.router.navigate(['/search']);
  }
}
