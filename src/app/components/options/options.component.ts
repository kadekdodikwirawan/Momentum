import { Component, OnInit } from '@angular/core';
import { FabricService } from 'src/app/services/fabric.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {

  editWH = false
  canvasHeight = this.fabric._canvas.getHeight() || 0
  canvasWidth = this.fabric._canvas.getWidth() || 0
  canvasPages = this.fabric.canvasPages
  constructor(
    public fabric: FabricService
  ) { }

  ngOnInit() {
    console.log(this.canvasPages);

  }

  editWHFn() {
    this.editWH = !this.editWH
  }
  changeCanvas(dimension: 'height' | 'width', target: any) {
    if (dimension === 'height') {
      this.fabric._canvas.setHeight(target.value)
    } else {
      this.fabric._canvas.setWidth(target.value)
    }
  }
  addPage() {
    this.fabric.addCanvas()
  }
  switchPage(e: any) {

  }
}
