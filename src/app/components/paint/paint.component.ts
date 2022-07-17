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
  constructor(
    private http: HttpClient,
    private modal: ModalController,
    public fabric: FabricService
  ) { }

  ngAfterViewInit(): void {
    this.fabric.setCanvas()
  }

  ngOnInit() {
  }
}
