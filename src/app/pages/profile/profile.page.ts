import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/generated/graphql';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  me$: Observable<User>;
  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.getMe()
  }
  async getMe() {
    this.me$ = this.auth.getMe().valueChanges.pipe(
      map(({ data }: any) => data.viewer)
    )
  }
  logOut() {
    this.auth.logOut()
  }
}
