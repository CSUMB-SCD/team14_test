import { Item } from '../items';
import { Router } from '@angular/router';
import { ItemsService } from '../items.service';
import { Component, OnInit } from '@angular/core';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  images = [
    'https://sgbonline.com/wp-content/uploads/2016/06/PacSun_062116.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/A1Gb7%2B-DJ5L._UX679_.jpg'
  ];

  total_items: number;

  constructor(public itemSVC: ItemsService, private router: Router) {
    this.total_items = 0;
  }

  ngOnInit() {
    if (this.itemSVC != null && this.itemSVC.allItems != null) {
      this.total_items = this.itemSVC.allItems.length;
    }
  }

  detailPageRedirect(item: Item) {
    this.itemSVC.showItemDetail = item;
    this.router.navigate(['/details']);
  }
}
