import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { fabric } from 'fabric';
import 'fabric-history';

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
  protected _canvas?: fabric.Canvas;
  constructor(
    private http: HttpClient,
    private modal: ModalController
  ) { }

  ngAfterViewInit(): void {
    this._canvas = new fabric.Canvas('fabricSurface', {
      // isDrawingMode: true,
      backgroundColor: 'transparent',
      selection: false,
      preserveObjectStacking: true,
    });
    this._canvas.setHeight(658);
    this._canvas.setWidth(350);
    this._canvas.add(new fabric.Textbox('Hello Fabric!'));
  }

  ngOnInit() {
    this.getIcons();
  }

  saveSVG() {
    const svg = this._canvas.toSVG();
    console.log(svg);
  }
  resizeCanvas() {
    const outerCanvasContainer = document.getElementById('fabric-canvas-wrapper');
    // const ratio = this._canvas.getWidth() / this._canvas.getHeight();
    const containerWidth = outerCanvasContainer.clientWidth;
    const containerHeaight = outerCanvasContainer.clientHeight;
    const scale = containerWidth / this._canvas.getWidth();
    const zoom = this._canvas.getZoom() * scale;
    this._canvas.setDimensions({ width: containerWidth, height: containerHeaight });
    this._canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);
  }
  removeObj() {
    this._canvas.remove(this._canvas.getActiveObject());
  }
  async getIcons() {
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIzMTk2MjEwNCIsInVpcCI6IjEwLjQzLjEuODAiLCJleHAiOjE2NTc5Nzk5NjYsInVuYW1lIjoidXNlcjMxOTYyMTA0IiwicnBtIjoyNDAwLCJwcmVtaXVtIjpmYWxzZSwiYXBpa2V5IjoiMmUyMDY3YWJiYmZjMTFjNGExZjg5ZWVlMWNlNmQyYmZjNmE4ODc5ZiIsInNjb3BlIjpbIm93bmVkLnJlYWQiXSwiZGxpbWl0Ijo1MDAsImFwaWRsaW1pdCI6dHJ1ZSwiZExpbWl0UmVuZXdEYXRlIjoiMjAyMi0wOC0xNSJ9.jiTcb8CQWl8ekSy0zqFQF42RKoe5M2lsV1yxLDxTSG4'

    };
    this.http.get('https://api.flaticon.com/v3/search/icons/added?q=arrow&styleShape=fill&limit=75', { headers }).subscribe(
      (res: any) => {
        this.icons = res.data
      }
    )
  }
  addIcon(url: string) {
    let can = this._canvas;
    fabric.Image.fromURL(url, function (myImg: any) {
      const img1 = myImg.set({ left: 0, top: 0, width: 512, height: 512 });
      can.add(img1);
    });
    this._canvas = can
    this.modal.dismiss();
  }
  undo() {
    // @ts-ignore
    this._canvas.undo();
  }
  redo() {
    // @ts-ignore
    this._canvas.redo()
  }
}
