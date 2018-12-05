import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  images = [
    'http://about.hm.com/content/dam/hmgroup/groupsite/images/teaser/Career/values-career-teaser.jpg/_jcr_content/renditions/cq5dam.web.976.654.jpeg',
    'https://sgbonline.com/wp-content/uploads/2016/06/PacSun_062116.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/A1Gb7%2B-DJ5L._UX679_.jpg'
  ];

  clothing_images = [
    'https://images-na.ssl-images-amazon.com/images/I/A1FpwwB5J5L._UX679_.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/81jd5NigoeL._UX679_.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/A1Gb7%2B-DJ5L._UX679_.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/81x3RtQemGL._UX466_.jpg'
  ];

  constructor() { }

  ngOnInit() {
  }

}
