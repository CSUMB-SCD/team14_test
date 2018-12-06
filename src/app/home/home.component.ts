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
    'https://anf.scene7.com/is/image/anf/A-20181129-USCA-D-HP-na?$marketing$&wid=1568',
    'https://anf.scene7.com/is/image/anf/A-20181106-USCA-D-HP-jeans?$marketing$&wid=1568',
    'https://stg-ag-library.imgix.net/18_10/18_10_12/181012_HP_PremiumT_LS_M_hp_hero_01_lg-desktop.jpg?auto=format&w=960',
    'https://cdn.shopify.com/s/files/1/0123/5065/2473/files/1900x725-Brushed-Flannel-Navy-Banner-3_1900x725.jpg?v=1543889720'
  ];

  constructor(public itemSVC: ItemsService, private router: Router) {
  }

  ngOnInit() {
  }

  detailPageRedirect(item: Item) {
    this.itemSVC.showItemDetail = item;
    this.router.navigate(['/details']);
  }
}
