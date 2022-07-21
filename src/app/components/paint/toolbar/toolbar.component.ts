import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FabricService } from 'src/app/services/fabric.service';
import { FontsComponent } from '../../fonts/fonts.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  constructor(
    public fabric: FabricService,
    private modalctrl: ModalController
  ) { }

  ngOnInit() { }

  async selectFont() {
    const modal = await this.modalctrl.create({
      component: FontsComponent,
      breakpoints: [0.4],
      initialBreakpoint: 0.4
    });
    modal.present()
  }
}
