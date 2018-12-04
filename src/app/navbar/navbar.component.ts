import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, public userSVC: UsersService) { }

  ngOnInit() {
  }

  logout() {
    this.userSVC.mainUser = null;
    this.router.navigate(['/signin']);
  }
}
