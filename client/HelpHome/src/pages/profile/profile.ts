import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  items = []
  title = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title = navParams.data.title;
   }

  ionViewDidLoad() {
    let navigationData = this.navParams.data.data;
    for (const key in navigationData) {
      if (navigationData.hasOwnProperty(key)) {
        const element = navigationData[key];
        this.items.push({ key: key, value: element });
        // alert(element);
        // this.items.push(element);
      }
    }
  }
}
