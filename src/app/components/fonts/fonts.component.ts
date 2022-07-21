import { Component, OnInit } from '@angular/core';
import { FabricService } from 'src/app/services/fabric.service';

@Component({
  selector: 'app-fonts',
  templateUrl: './fonts.component.html',
  styleUrls: ['./fonts.component.scss'],
})
export class FontsComponent implements OnInit {

  fontWeights = ['bold', 'normal', 400, 600, 800]
  // @ts-ignore
  fontWeight = this.fabric._canvas.getActiveObject().get('fontWeight')
  fontColor = this.fabric._canvas.getActiveObject().get('fill')
  fontFamilys = [
    'Sacramento', 'Andada Pro', 'Cedarville Cursive', 'Fleur De Leah', 'Hahmlet', 'JetBrains Mono', 'Just Another Hand', 'Manrope', 'Oleo Script', 'Oswald', 'Roboto', 'Caveat', 'Dancing Script', 'Indie Flower', 'Island Moments', 'Kalam', 'Licorice', 'Love Light', 'Mea Culpa', 'Oooh Baby', 'Pacifico', 'Qwitcher Grypen', 'Sacramento', 'Satisfy', 'Shadows Into Light', 'Shizuru', 'The Nautigal', 'Vujahday Script', 'Waterfall', 'Yellowtail']
  // @ts-ignore
  fontFamily = this.fabric._canvas.getActiveObject().get("fontFamily") || 'Roboto'
  // @ts-ignore
  fontSize = this.fabric._canvas.getActiveObject().get("fontSize")
  range = document.querySelector('ion-range');
  constructor(
    public fabric: FabricService
  ) { }

  ngOnInit() {

  }
  pinFormatter(e: any) {
    return e.value
  }
  activeObjSet(object: any | string, data: any) {
    object == 'fontFamily' ? this.fontFamily = data.value : true
    object == 'fontSize' ? this.fontSize = data.value : true
    object == 'fontWeight' ? this.fontWeight = data.value : true
    // @ts-ignore
    this.fabric._canvas.getActiveObject().set(object, data.value)
    this.fabric._canvas.renderAll();
  }
}
