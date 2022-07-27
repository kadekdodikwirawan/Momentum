import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FabricService } from 'src/app/services/fabric.service';

@Component({
  selector: 'app-add-link',
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.scss'],
})
export class AddLinkComponent implements OnInit {

  // @ts-ignore
  link = this.fabric._canvas.getActiveObject().get('dataUrl')
  error: any;
  constructor(
    public fabric: FabricService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  async saveLink() {
    let url;
    try {
      url = new URL(this.link);
      this.error = null
      // @ts-ignore
      this.fabric._canvas.getActiveObject().set('dataUrl', url.href)
      this.modalCtrl.dismiss()
    } catch (_) {
      console.log(_);
      this.error = _
      return false;
    }
  }
}
