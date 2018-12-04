import { UsersService } from './users.service';
import { Component } from '@angular/core';
import { User } from 'src/app/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng6';
  user: User;
  constructor(private userSVC: UsersService) {}
}
