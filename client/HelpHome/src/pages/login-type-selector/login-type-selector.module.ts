import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginTypeSelectorPage } from './login-type-selector';

@NgModule({
  declarations: [
    LoginTypeSelectorPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginTypeSelectorPage),
  ],
})
export class LoginTypeSelectorPageModule {}
