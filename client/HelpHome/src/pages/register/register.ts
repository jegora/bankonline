import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ServiceProvider } from './../../providers/auth-service/auth-service';
import { AlertPage } from '../modals/alert';
import { DBStorage } from '../../providers/storage';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage {

  emailValidationRegex = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'

  mainForm: FormGroup

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private serviceProvider: ServiceProvider,
    protected alertPage: AlertPage,
    public storage: DBStorage) {

    this.mainForm = this.formBuilder.group({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      patronymic: new FormControl(''),
      email: new FormControl('', [Validators.pattern(this.emailValidationRegex), Validators.required]),
      dob: new FormControl('', Validators.required),

      passport_series: new FormControl('', Validators.required),
      passport_number: new FormControl('', Validators.required),
      authority: new FormControl('', Validators.required),
      date_issue: new FormControl('', Validators.required),
      identification_number: new FormControl('', Validators.required),

      password: new FormControl('', [Validators.required, Validators.minLength(4)]),


      place_birth: new FormControl('', Validators.required),
      address_current: new FormControl('', Validators.required),
      address_registration: new FormControl('', Validators.required),

      family_relation: new FormControl('', Validators.required),
      phone_first: new FormControl('', Validators.required),
      phone_second: new FormControl('', Validators.required),
      citizenship: new FormControl('', Validators.required),

      disabled: new FormControl('', Validators.required),
      job: new FormControl('', Validators.required),
      speciality: new FormControl('', Validators.required),
      income: new FormControl('', Validators.required),
    })
  }

  onCloseButtonClick() {
    this.viewCtrl.dismiss()
  }

  onAddButtonClick() {
    let parameters = this.mainForm.value;
    alert(JSON.stringify(parameters));
    this.serviceProvider.add(parameters).subscribe((response) => {
      if (response.statusCode === 200) {
        this.viewCtrl.dismiss();
      } else {
        this.alertPage.showErrorAlert('Error', response.data['description']);
      }
    })
  }

}
