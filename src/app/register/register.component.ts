import { Component, OnInit } from '@angular/core';

import { User } from '../user';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  new_user: User;
  allUsers: User[]; // Testing: Checking Registered user
  is_un_missing: boolean;
  is_pw_missing: boolean;
  is_un_taken: boolean;

  constructor(private userSVC: UsersService, private router: Router) {
    this.userSVC.getAllUsers().subscribe(data => {
      this.allUsers = data;
      console.log(data);
    });
    this.is_un_taken = false;
  }

  ngOnInit() {
  }

  private validate_info(passed_in_username: string, passed_in_password: string) {
    let n: number;
    let user: User;
    let is_info_empty: boolean;

    n = this.allUsers.length;
    this.is_un_missing = passed_in_username === '';
    this.is_pw_missing = passed_in_password === '';
    is_info_empty = this.is_un_missing || this.is_pw_missing;

    // Check for:
    //  - Empty input
    if (is_info_empty) {
      return true;
    }

    //  - Matching Usernames
    for (let i = 0; i < n; ++i) {
      user = this.allUsers[i];
      this.is_un_taken = user.userName === passed_in_username;

      if (this.is_un_taken) {
        return true;
      }
    }

    return false;
  }

  register_user(event) {
    event.preventDefault();
    const target = event.target;
    const passed_in_un = target.querySelector('#username').value;
    const passed_in_pw = target.querySelector('#password').value;
    const is_un_taken = this.validate_info(passed_in_un, passed_in_pw);

    if (is_un_taken) {
      return;
    }

    // Register User
    this.userSVC.createUser(passed_in_un, passed_in_pw).subscribe();
    this.router.navigate(['signin']);
  }

}
