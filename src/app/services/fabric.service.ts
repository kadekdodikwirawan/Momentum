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
      centeredScaling: true,
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
    this._canvas.add(new fabric.Textbox('Hello Fabric!', {
      fontFamily: 'Roboto'
    }));
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
    navigator.clipboard.writeText(svg)
    console.log(svg);
  }
  setFont(fontName: string) {
    // @ts-ignore
    this._canvas.getActiveObject().set("fontFamily", fontName)
  }
  undo() {
    // @ts-ignore
    this._canvas.undo();
  }
  redo() {
    // @ts-ignore
    this._canvas.redo()
  }
  animate() {
    this._canvas.getActiveObject().animate(
      'left', this._canvas.getActiveObject().left === 100 ? 400 : 100, {
      duration: 1000,
      onChange: this._canvas.renderAll.bind(this._canvas)
    }
    )
  }
}
