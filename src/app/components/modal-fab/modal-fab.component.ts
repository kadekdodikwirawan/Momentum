import { Component, OnInit } from '@angular/core';
import { FabricService } from 'src/app/services/fabric.service';

@Component({
  selector: 'app-modal-fab',
  templateUrl: './modal-fab.component.html',
  styleUrls: ['./modal-fab.component.scss'],
})
export class ModalFabComponent implements OnInit {

  tab = 'icons'
  constructor(
    public fabric: FabricService,
  ) { }

  ngOnInit() { }
  upload() {

  }
  onChange(e: any) {
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.onloadend = (e) => {
      // return reader.result
      this.fabric.addImage(reader.result);

    }
    reader.readAsDataURL(file)
  }

}
