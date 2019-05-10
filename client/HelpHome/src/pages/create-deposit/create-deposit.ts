import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/auth-service/auth-service';


@IonicPage()
@Component({
  selector: 'page-create-deposit',
  templateUrl: 'create-deposit.html',
})
export class CreateDepositPage {
  userId = '';
  currentDeposit;

  deposits = [];
  deposit;
  
  amount = 0;
  term = 0;
  rate = 0;
  min = 0;
  income = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private serviceProvider: ServiceProvider, public viewCtrl: ViewController) { }

  ionViewDidLoad() {
    this.deposits = this.navParams.data.data;
    this.userId = this.navParams.data.userId;
  }

  onDepositTypeChange() {
    this.deposits.forEach(d => {
      if (d.description === this.deposit) {
        this.currentDeposit = d;
      }
    });

    this.rate = this.currentDeposit.rate;
    this.min = this.currentDeposit.minAmount;
  }

  onAmountChange() {
    let r = this.rate/100.0;
    let koeff = Math.pow((1.0 + r), parseInt(this.term['value']));
    this.income = this.amount * koeff;
  }

  onTermChange(term) {
    this.term = term;
  }

  onAddButtonClick() {
    // user_id: String,
    // deposit_type: String,
    // term: Number,
    // amount: Number,

    var reg = new RegExp('^[0-9]+$');

    if (!reg.test(this.amount.toString())) {
      alert('Введите корректную сумму');
      return;
    }

    if (this.amount < this.min) {
      alert('Введите сумму больше чем ' + this.min);
      return;
    }

    let data = {
      user_id: this.userId,
      deposit_type: this.currentDeposit._id,
      term: this.term['value'],
      amount: this.amount,
    };

    this.serviceProvider.addUserDeposit(data).subscribe(response => {
      this.viewCtrl.dismiss();
    });
  }

}
