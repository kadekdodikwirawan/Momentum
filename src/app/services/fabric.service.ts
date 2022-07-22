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
  constructor() {
    fabric.Object.prototype.set({
      borderColor: 'red',
      cornerColor: 'red',
      cornerStyle: 'circle'
    })
    // add custom property to object
    fabric.Object.prototype.toObject = (function (toObject) {
      return function (propertiesToInclude) {
        propertiesToInclude = (propertiesToInclude || []).concat(
          ['uuid', 'class']
        );
        return toObject.apply(this, [propertiesToInclude]);
      };
    })(fabric.Object.prototype.toObject);

    // add property class when call toSvg Fn
    // @ts-ignore
    fabric.SHARED_ATTRIBUTES.push('class')
    fabric.Path.ATTRIBUTE_NAMES.push('class')
    fabric.Image.ATTRIBUTE_NAMES.push('class')
    fabric.Textbox.prototype.toSVG = (function (_toSVG) {
      return function () {
        let svg = _toSVG.call(this).split(" ");
        let cleanSvg = _toSVG.call(this)
        if (this.class) {
          svg.splice(1, 0, 'class="' + this.class + '"');
          cleanSvg = svg.join(' ')
        }
        return cleanSvg;
      }
    })(fabric.Textbox.prototype.toSVG)
  }

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
    // const svg = this._canvas.toJSON();
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
