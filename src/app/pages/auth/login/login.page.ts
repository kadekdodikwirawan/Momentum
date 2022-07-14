import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import presentAlert from 'src/app/utils/alertCtrl';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userdata: FormGroup;
  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.userdata = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  login() {
    this.loading = true;
    this.auth.login(this.userdata).subscribe(async ({ data }: any) => {
      this.auth.setToken(data);
      // redirect on GuestGuard
      this.loading = false;
    }, (error) => {
      presentAlert('Terjadi kesalahan', '', error)
      this.loading = false;
    })
  }
}
