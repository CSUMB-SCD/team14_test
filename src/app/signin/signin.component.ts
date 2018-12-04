import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  is_login_valid: boolean;
  allUsers: User[];
  //

  // Open the Chrome Debugger to see the possible Usernames and Passwords
  constructor(private userSVC: UsersService, private router: Router) {
    this.is_login_valid = true;
    this.userSVC.getAllUsers().subscribe(data => {
      this.allUsers = data;
      console.log(data);
    });
  }

  ngOnInit() {

  }

  loginUser(event) {
    event.preventDefault();
    const target = event.target;
    const passed_in_un = target.querySelector('#username').value;
    const passed_in_pw = target.querySelector('#password').value;

      this.userSVC.getAllUsers().subscribe(data => {
        this.allUsers = data;
        console.log(data);
      });

    for (const user of this.allUsers) {
      if (user.userName === passed_in_un && user.password === passed_in_pw) {
        this.is_login_valid = true;
        this.router.navigate(['/home']);
        this.userSVC.mainUser = user;
        break;
      }
      this.is_login_valid = false;
    }

    // Press Option + Command + i (Access Tools for debugging in Chrome)
    console.log('Username: ', passed_in_un, 'Password: ', passed_in_pw);
    console.log('Valid: ', this.is_login_valid);
  }
}
