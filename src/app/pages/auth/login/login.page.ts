import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import presentAlert from 'src/app/utils/alertCtrl';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: String;
  password: String;
  loading = false;
  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit() {
  }
  login() {
    this.loading = true;
    this.auth.login(this.username, this.password).subscribe(async ({ data }: any) => {
      this.auth.setToken(data);
      // redirect on GuestGuard
      this.loading = false;
    }, (error) => {
      presentAlert('Terjadi kesalahan', '', error)
      this.loading = false;
    })
  }
}
