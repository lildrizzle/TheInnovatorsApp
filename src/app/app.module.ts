import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from 'src/environments/environment';
import {HttpClientModule} from '@angular/common/http';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import{ AngularFireStorageModule } from '@angular/fire/storage';
import{ AngularFirestoreModule } from '@angular/fire/firestore';
import { DataService } from './data.service';
import { CookieService } from 'ngx-cookie-service';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
    HttpClientModule,AngularFireModule,
    AngularFireAuthModule,
  AngularFireStorageModule,
AngularFirestoreModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, {provide: AngularFireAuthGuard},{provide: DataService},{provide: CookieService}],
  bootstrap: [AppComponent],
})
export class AppModule {}
