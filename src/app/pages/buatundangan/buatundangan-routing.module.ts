import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuatundanganPage } from './buatundangan.page';

const routes: Routes = [
  {
    path: '',
    component: BuatundanganPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuatundanganPageRoutingModule {}
