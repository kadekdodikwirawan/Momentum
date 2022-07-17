import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { fabric } from 'fabric';
import 'fabric-history';
import { FabricService } from 'src/app/services/fabric.service';

@Component({
  selector: 'app-paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.scss'],
})
export class PaintComponent implements OnInit, AfterViewInit {

  canvasWidth: 350;
  canvasHeight: 600;
  selected: any = null;
  icons: any;
  constructor(
    private http: HttpClient,
    private modal: ModalController,
    public fabric: FabricService
  ) { }

  ngAfterViewInit(): void {
    this.fabric.setCanvas()
  }

  ngOnInit() {
    this.getIcons();
  }
  async getIcons() {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer  ${localStorage.getItem('flaticon-token') ? localStorage.getItem('flaticon-token') : ''}`

    };
    this.http.get('https://api.flaticon.com/v3/search/icons/added?q=arrow&styleShape=fill&limit=75', { headers }).subscribe(
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
      can.add(img1);
    });
    this.fabric._canvas = can
    this.modal.dismiss();
  }
}
