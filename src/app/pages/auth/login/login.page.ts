import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: String;
  password: String;
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }
  login() {
    this.auth.login(this.username, this.password)
  }
}
