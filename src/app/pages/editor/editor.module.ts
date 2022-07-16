import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditorPageRoutingModule } from './editor-routing.module';

import { EditorPage } from './editor.page';
import { PaintComponent } from 'src/app/components/paint/paint.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditorPageRoutingModule,
  ],
  declarations: [
    EditorPage,
    PaintComponent
  ]
})
export class EditorPageModule { }
