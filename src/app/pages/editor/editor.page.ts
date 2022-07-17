import { Component, OnInit, ViewChild } from '@angular/core';
import { PaintComponent } from 'src/app/components/paint/paint.component';
import { FabricService } from 'src/app/services/fabric.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit {
  @ViewChild(PaintComponent)
  public paintComponent: PaintComponent
  constructor(
    public fabric: FabricService
  ) { }

  ngOnInit() {
  }
}
