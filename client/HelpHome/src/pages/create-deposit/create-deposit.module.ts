import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateDepositPage } from './create-deposit';

@NgModule({
  declarations: [
    CreateDepositPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateDepositPage),
  ],
})
export class CreateDepositPageModule {}
