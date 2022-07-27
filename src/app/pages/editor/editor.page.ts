import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalFabComponent } from 'src/app/components/modal-fab/modal-fab.component';
import { OptionsComponent } from 'src/app/components/options/options.component';
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
    private modalCtrl: ModalController,
  ) { }
  ngOnInit() {

  }
  async options() {
    const modal = await this.modalCtrl.create({
      component: OptionsComponent,
      breakpoints: [0.50, 0.75, 1],
      initialBreakpoint: 0.50
    })
    modal.present();
  }
  async modalIcons() {
    const modal = await this.modalCtrl.create({
      component: ModalFabComponent,
      breakpoints: [0.50, 0.75, 1],
      initialBreakpoint: 0.50
    })
    modal.present();
  }
}
