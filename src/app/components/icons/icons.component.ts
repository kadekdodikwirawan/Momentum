import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FabricService } from 'src/app/services/fabric.service';
import { fabric } from 'fabric';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss'],
})
export class IconsComponent implements OnInit {

  keyword: any;
  icons: any;
  constructor(
    private http: HttpClient,
    public fabric: FabricService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async getIcons() {
    if (!this.keyword) {
      return
    }
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer  ${localStorage.getItem('flaticon-token') ? localStorage.getItem('flaticon-token') : ''}`

    };
    this.http.get(`https://api.flaticon.com/v3/search/icons/added?q=${this.keyword}&styleShape=fill&limit=75`, { headers }).subscribe(
      (res: any) => {
        this.icons = res.data
      },
      (err: any) => {
        this.flaticonAuth()
      }
    )
  }
  async flaticonAuth() {
    const apikey = {
      "apikey": "2e2067abbbfc11c4a1f89eee1ce6d2bfc6a8879f"
    }
    this.http.post('https://api.flaticon.com/v3/app/authentication', apikey).subscribe(
      (res: any) => {
        if (res.data) {
          localStorage.setItem('flaticon-token', res.data.token)
          this.getIcons()
        }
      }
    )
  }
  addIcon(url: string) {
    let can = this.fabric._canvas;
    fabric.Image.fromURL(url, function (myImg: any) {
      const img1 = myImg.set({ left: 0, top: 0, width: 512, height: 512 });
      img1.scaleToWidth(can.getWidth())
      can.add(img1);
    });
    this.fabric._canvas = can
    this.modalCtrl.dismiss();
  }
}
