import { Component, OnInit } from '@angular/core';
import { FabricService } from 'src/app/services/fabric.service';

@Component({
  selector: 'app-font-size',
  templateUrl: './font-size.component.html',
  styleUrls: ['./font-size.component.scss'],
})
export class FontSizeComponent implements OnInit {

  // @ts-ignore
  fontSize = this.fabric._canvas.getActiveObject().get("fontSize")
  // @ts-ignore
  fontWeight = this.fabric._canvas.getActiveObject().get('fontWeight')
  fontWeights = ['bold', 'normal', 400, 600, 800]
  range = document.querySelector('ion-range');
  constructor(
    public fabric: FabricService
  ) { }

  ngOnInit() { }

  pinFormatter(e: any) {
    return e.value
  }
  activeObjSet(object: any | string, data: any) {
    object == 'fontSize' ? this.fontSize = data.value : true
    object == 'fontWeight' ? this.fontWeight = data.value : true
    // @ts-ignore
    this.fabric._canvas.getActiveObject().set(object, data.value)
    this.fabric._canvas.requestRenderAll();
  }
}
