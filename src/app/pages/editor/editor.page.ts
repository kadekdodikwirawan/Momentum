import { Component, OnInit, ViewChild } from '@angular/core';
import { PaintComponent } from 'src/app/components/paint/paint.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit {
  @ViewChild(PaintComponent)
  private paintComponent: PaintComponent
  constructor() { }

  ngOnInit() {
  }
  saveCanvas() {
    this.paintComponent.saveSVG();
  }
  undo() {
    this.paintComponent.undo();
  }
  redo() {
    this.paintComponent.redo()
  }
}
