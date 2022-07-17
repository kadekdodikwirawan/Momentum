import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FabricService } from 'src/app/services/fabric.service';
import { FontSizeComponent } from '../../font-size/font-size.component';

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

  async selectFontsize() {
    const modal = await this.modalctrl.create({
      component: FontSizeComponent,
      breakpoints: [0.2],
      initialBreakpoint: 0.2
    });
    modal.present()
  }
}
