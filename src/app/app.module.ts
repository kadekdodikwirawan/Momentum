import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphqlModule } from './graphql/graphql.module';
import { AuthService } from './services/auth.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { IconsComponent } from './components/icons/icons.component';
import { FormsModule } from '@angular/forms';
import { OptionsComponent } from './components/options/options.component';
import { ModalFabComponent } from './components/modal-fab/modal-fab.component';
import { FontsComponent } from './components/fonts/fonts.component';
import { FontSizeComponent } from './components/font-size/font-size.component';
import { AddLinkComponent } from './components/add-link/add-link.component';

@NgModule({
  declarations: [
    AppComponent,
    IconsComponent,
    FontsComponent,
    FontSizeComponent,
    AddLinkComponent,
    OptionsComponent,
    ModalFabComponent
  ],
  imports: [
    IonicStorageModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    GraphqlModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerImmediately'
    })],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AuthService,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
