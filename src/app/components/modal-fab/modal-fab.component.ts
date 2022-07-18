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

}
