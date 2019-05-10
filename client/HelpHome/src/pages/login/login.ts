import { ServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertPage } from '../modals/alert';
import { DBStorage } from '../../providers/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  emailValidationRegex = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'

  loading: Loading;
  loginCredentials = { email: '', password: '' };

  mainForm: FormGroup

  constructor(public navCtrl: NavController,
    private auth: ServiceProvider,
    private alert: AlertPage,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private storage: DBStorage) {
    this.mainForm = this.formBuilder.group({
      email: new FormControl('', [Validators.pattern(this.emailValidationRegex), Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    })
  }

  public submitLoginForm() {
    this.auth.login(this.loginCredentials).subscribe(response => {
      if (response.statusCode === 200) {
        this.navCtrl.setRoot('HomePage', { data: response })
      } else {
        this.alert.showErrorAlert('Error', response.data['description'])
      }
    })
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait..',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss()
  }
}
