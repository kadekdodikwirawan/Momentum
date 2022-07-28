import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
import 'fabric-history';
import { Subject } from 'rxjs';
import { initAligningGuidelines, initCenteringGuidelines } from '../lib/canvasGuidline';


@Injectable({
  providedIn: 'root'
})
export class FabricService {

  public canvasPages: fabric.Canvas[] = []
  public currenPage: number = 0
  public _canvas: fabric.Canvas;
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
          ['uuid', 'class', 'dataUrl']
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
        if (this.dataUrl) {
          svg.splice(1, 0, 'data-url="' + this.dataUrl + '"');
        }
        if (this.class) {
          svg.splice(1, 0, 'class="' + this.class + '"');
        }
        if (this.ownMatrixCache) {
          const matrix = this.ownMatrixCache.value.join(" ")
          svg.splice(1, 0, 'transform-fixed="matrix(' + matrix + ')"');
        }
        return svg.join(" ");
      }
    })(fabric.Textbox.prototype.toSVG)
    fabric.Image.prototype.toSVG = (function (_toSVG) {
      return function () {
        let svg = _toSVG.call(this).split(" ");
        if (this.dataUrl) {
          svg.splice(1, 0, 'data-url="' + this.dataUrl + '"');
        }
        if (this.class) {
          svg.splice(1, 0, 'class="' + this.class + '"');
        }
        if (this.ownMatrixCache) {
          const matrix = this.ownMatrixCache.value.join(" ")
          svg.splice(1, 0, 'transform-fixed="matrix(' + matrix + ')"');
        }
        return svg.join(" ");
      }
    })(fabric.Image.prototype.toSVG)
  }

  public setCanvas() {
    const canvasEl = document.getElementById('fabric-canvas-wrapper').appendChild(document.createElement("canvas"))
    canvasEl.setAttribute('id', 'canvas-' + this.currenPage)
    this._canvas = new fabric.Canvas(canvasEl, {
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
    this._canvas.add(new fabric.Textbox('Hello World!', {
      fontFamily: 'Roboto'
    }));
    initAligningGuidelines(this._canvas);
    initCenteringGuidelines(this._canvas);
    this.canvasPages.push(this._canvas)
  }
  addCanvas() {
    console.log(this._canvas);
    this.canvasPages.push(this._canvas);
  }
  addImage(url: any) {
    let can = this._canvas;
    fabric.Image.fromURL(url, function (myImg: any) {
      const img1 = myImg.set({ left: 0, top: 0 });
      img1.scaleToWidth(can.getWidth())
      can.add(img1);
    });
    this._canvas = can
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
    const json = this._canvas.toJSON();
    navigator.clipboard.writeText(svg)
    console.log(json);

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
