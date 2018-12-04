import { ItemsService } from './../items.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import * as $ from 'jquery';
import { Item } from '../items';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1
      })),
      state('hide',   style({
        opacity: 0
      })),
      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('1000ms ease-in'))
    ])
  ]
})
export class DetailsComponent implements OnInit {
  inValidQuant: boolean;
  show: boolean;

  constructor(public userSVC: UsersService, public itemsSVC: ItemsService) {
    this.inValidQuant = false;
    this.show = false;
  }

  ngOnInit() {
  }

  // updateCart() {
  //   const quant = Number($('#add').val());
  // }

  get stateName() {
    return this.show ? 'show' : 'hide';
  }

  toggle() {
    this.show = !this.show;
    this.untoggle();
  }
  untoggle() {
    this.show = !this.show;
  }

  updateCart() {
    if (this.userSVC.mainUser != null) {

      const quant = Number($('#add').val());
      let updated =  false;

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

}
