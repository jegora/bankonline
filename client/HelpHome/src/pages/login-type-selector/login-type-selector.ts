import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { DBStorage } from '../../providers/storage'

@IonicPage()
@Component({
  selector: 'page-login-type-selector',
  templateUrl: 'login-type-selector.html',
})
export class LoginTypeSelectorPage {

  loginTypeSelectorActive = true

  constructor(public storage: DBStorage, public navCtrl: NavController, public modalCtrl: ModalController) { }

  onBackButtonClick() {
    this.openRoleSelector(false)
  }

  onButtonClick(sender) {
    var buttonIdentifier = sender.currentTarget.id

    switch (buttonIdentifier) {
      case 'first_button_id':
        if (this.loginTypeSelectorActive) {
          this.openRoleSelector(true)
        } else {
          this.openRegistrationOfType('Residents')
        } 
        break
      case 'second_button_id':
        if (this.loginTypeSelectorActive) {
          this.openLogin()
        } else {
          this.openRegistrationOfType('Companies')
        } 
        break
    }
  }

  openRoleSelector(showSelector) {
    this.loginTypeSelectorActive = !showSelector
  }

  openLogin() {
    this.navCtrl.push('LoginPage')
  }

  openRegistrationOfType(parameter) {
    //  Check parameter value for the registration type
    //  value == [ Companies, Residents ]
    //
    let registrationController = this.modalCtrl.create('RegisterPage')
    registrationController.onDidDismiss(data => {
      if (data) {
        this.navCtrl.setRoot('HomePage')
      } else {
        console.log('Just close')
      }
    })
    registrationController.present()
  }

  ionViewDidLoad() {
    this.storage.getToken().then(token => {
      if (token) { this.navCtrl.setRoot('HomePage') }
    })
  }
}
