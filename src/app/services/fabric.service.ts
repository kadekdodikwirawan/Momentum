import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
import 'fabric-history';
import { initAligningGuidelines, initCenteringGuidelines } from '../lib/canvasGuidline';


@Injectable({
  providedIn: 'root'
})
export class FabricService {

  public _canvas?: fabric.Canvas;
  public selectedObj: any = null;
  constructor() { }

  public setCanvas() {
    this._canvas = new fabric.Canvas('fabricSurface', {
      // isDrawingMode: true,
      backgroundColor: 'transparent',
      selection: false,
      preserveObjectStacking: true,
    });
    this._canvas.setHeight(658);
    this._canvas.setWidth(350);
    // @ts-ignore
    this._canvas.on('selection:created', (obj: any) => this.selectedObj = obj)
    this._canvas.on('selection:updated', (obj: any) => this.selectedObj = obj)
    this._canvas.on('selection:cleared', (obj: any) => this.selectedObj = null)
    this._canvas.add(new fabric.Textbox('Hello Fabric!'));
    initAligningGuidelines(this._canvas);
    initCenteringGuidelines(this._canvas);
  }
  removeObj() {
    this._canvas.remove(this._canvas.getActiveObject());
  }
  duplicate() {
    this._canvas.getActiveObject().clone((obj: any) => {
      obj.set({ top: 0 })
      obj.set({ left: 0 })
      this._canvas.add(obj)
    })
  }
  enterEditing(obj: any) {
    obj.enterEditing()
  }
  saveSVG() {
    const svg = this._canvas.toSVG();
    console.log(svg);
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
