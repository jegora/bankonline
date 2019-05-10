import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateCreditPage } from './create-credit';

@NgModule({
  declarations: [
    CreateCreditPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateCreditPage),
  ],
})
export class CreateCreditPageModule {}
