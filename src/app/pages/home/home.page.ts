import { Component, OnInit } from '@angular/core';
import { ThemesService } from 'src/app/services/themes.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  appName = environment.appName;
  undangans: any;
  loading = true;
  error: any;
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  constructor(
    private themes: ThemesService,
  ) { }

  ngOnInit() {
    this.getData();
  }
  async getData() {
    this.themes.getData().valueChanges.subscribe((result: any) => {
      this.undangans = result.data?.undangans;
      this.loading = result.loading;
      this.error = result.error;
    });
  }
}
