import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuatundanganPageRoutingModule } from './buatundangan-routing.module';

import { BuatundanganPage } from './buatundangan.page';
import { UndanganService } from 'src/app/services/undangan.service';
import { SafePipe } from 'src/app/pipe/safe.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BuatundanganPageRoutingModule
  ],
  providers: [UndanganService],
  declarations: [BuatundanganPage, SafePipe]
})
export class BuatundanganPageModule { }
