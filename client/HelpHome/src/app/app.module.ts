import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ServiceProvider } from '../providers/auth-service/auth-service';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertPage } from '../pages/modals/alert';
import { DBStorage } from '../providers/storage';
import { LoginPageModule } from '../pages/login/login.module';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginPageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AlertPage,
    DBStorage,
    ServiceProvider
  ]
})
export class AppModule {}
