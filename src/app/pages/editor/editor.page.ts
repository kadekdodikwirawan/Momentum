import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IconsComponent } from 'src/app/components/icons/icons.component';
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
    public fabric: FabricService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }
  async modalIcons() {
    const modal = await this.modalCtrl.create({
      component: IconsComponent,
      breakpoints: [0.25, 0.50, 0.75],
      initialBreakpoint: 0.25
    })
    modal.present();
  }
}
