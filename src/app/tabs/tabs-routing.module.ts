import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { GuestGuard } from '../guards/guest.guard';
import { LoginPageModule } from '../pages/auth/login/login.module';
import { RegisterPageModule } from '../pages/auth/register/register.module';
import { BuatundanganPageModule } from '../pages/buatundangan/buatundangan.module';
import { HomePageModule } from '../pages/home/home.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { ShopPageModule } from '../pages/shop/shop.module';
import { ThemesPageModule } from '../pages/themes/themes.module';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'apps',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => HomePageModule
      },
      {
        path: 'themes',
        loadChildren: () => ThemesPageModule
      },
      {
        path: 'shop',
        loadChildren: () => ShopPageModule
      },
      {
        path: 'profile',
        loadChildren: () => ProfilePageModule,
        canActivate: [AuthGuard]
      },
      {
        path: 'auth/login',
        loadChildren: () => LoginPageModule,
        canActivate: [GuestGuard]
      },
      {
        path: 'auth/register',
        loadChildren: () => RegisterPageModule,
        canActivate: [GuestGuard]
      },
      {
        path: 'buatundangan',
        loadChildren: () => BuatundanganPageModule,
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'apps/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
