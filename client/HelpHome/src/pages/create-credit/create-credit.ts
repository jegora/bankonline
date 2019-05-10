import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/auth-service/auth-service';


@IonicPage()
@Component({
  selector: 'page-create-credit',
  templateUrl: 'create-credit.html',
})
export class CreateCreditPage {
  userId = '';
  currentCredit;

  credits = [];
  credit;

  amount = 0;
  term = 0;
  rate = 0;
  max = 0;
  income = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private serviceProvider: ServiceProvider, public viewCtrl: ViewController) { }

  ionViewDidLoad() {
    this.credits = this.navParams.data.data;
    this.userId = this.navParams.data.userId;
  }

  onDepositTypeChange() {
    this.credits.forEach(c => {
      if (c.description === this.credit) {
        this.currentCredit = c;
      }
    });
    // {"_id":"5cd5418284e1c488096d44fc","description":"Кредит Выгодный","rate":19,"maxAmount":30000}
    this.rate = this.currentCredit.rate;
    this.max = this.currentCredit.maxAmount;
  }

  onAmountChange() {
    let r = this.rate / 100.0;
    this.income = ((this.amount * r)/12 ) * parseInt(this.term['value']);
    // let koeff = Math.pow((1.0 + r), parseInt(this.term['value']));
    // this.income = this.amount * koeff;
  }

  onTermChange(term) {
    this.term = term;
  }

  onAddButtonClick() {
    // user_id: String,
    // credit_type: String,
    // term: Number,
    // amount: Number,

    var reg = new RegExp('^[0-9]+$');

    if (!reg.test(this.amount.toString())) {
      alert('Введите корректную сумму');
      return;
    }

    if (this.amount > this.max) {
      alert('Введите сумму меньше чем ' + this.max);
      return;
    }

    let data = {
      user_id: this.userId,
      credit_type: this.currentCredit._id,
      term: this.term['value'],
      amount: this.amount,
    };

    this.serviceProvider.addUserCredit(data).subscribe(response => {
      this.viewCtrl.dismiss();
    });
  }
}