import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  clients = [];
  deposits = [];
  credits = [];

  userDeposits = [];
  userCredits = [];

  userId = '';
  roleAdmin: Boolean = false; // admin === false

  constructor(private serviceProvider: ServiceProvider, private modalCtrl: ModalController, private navigationCtrl: NavController, private params: NavParams) { }

  ionViewDidEnter() {
    this.userId = this.params.data.data.data._id;
    this.roleAdmin = this.params.data.data.data.role === "admin";
    this.fetchData();
  }

  onExitButtonClick() {
    this.navigationCtrl.setRoot('LoginPage');
  }

  onItemClick(item) {
    this.modalCtrl.create('ProfilePage', { data: item.data, title: 'Клиент' }).present();
  }

  onDepositItemClick(item) {
    let title = this.depositNameById(item.data.deposit_type);
    // debugger;
    this.modalCtrl.create('ProfilePage', { data: item.data, title: title }).present();
  }

  onCreditItemClick(item) {
    let title = this.creditNameById(item.data.credit_type);
    // debugger;
    this.modalCtrl.create('ProfilePage', { data: item.data, title: title }).present();
  }

  onNewClietnButtonClick() {
    let addClientModal = this.modalCtrl.create('RegisterPage');

    addClientModal.onDidDismiss(data => this.fetchData());
    addClientModal.present();
  }

  onAddCreditButtonClick() {
    let addCreditModal = this.modalCtrl.create('CreateCreditPage', { data: this.credits, userId: this.userId });

    addCreditModal.onDidDismiss(data => this.fetchData());
    addCreditModal.present();
  }

  onAddDepositButtonClick() {
    let addDepositModal = this.modalCtrl.create('CreateDepositPage', { data: this.deposits, userId: this.userId });

    addDepositModal.onDidDismiss(data => this.fetchData());
    addDepositModal.present();
  }

  private fetchData() {
    this.fetchDeposits();
    this.fetchCredits();
    if (this.roleAdmin) {
      this.fetchUsers();
    } else {
      this.fetchUserCredits();
      this.fetchUserDeposits();
    }
  }

  private fetchUsers() {
    this.serviceProvider.getUsers().subscribe(response => {
      this.clients = [];
      for (const key in response.data) {
        if (response.data.hasOwnProperty(key)) {
          const element = response.data[key];
          let e = { data: element, description: element._id }
          this.clients.push(e);
        }
      }
    });
  }

  private fetchDeposits() {
    this.serviceProvider.getDeposits().subscribe(response => {
      this.deposits = [];
      // alert(JSON.stringify(response));
      for (const key in response.data) {
        if (response.data.hasOwnProperty(key)) {
          const element = response.data[key];
          this.deposits.push(element);
        }
      }
    });
  }

  private fetchCredits() {
    this.serviceProvider.getCredits().subscribe(response => {
      this.credits = [];
      // alert(JSON.stringify(response));
      for (const key in response.data) {
        if (response.data.hasOwnProperty(key)) {
          const element = response.data[key];
          this.credits.push(element);
        }
      }
    });
  }

  private fetchUserDeposits() {
    let params = { user_id: this.userId };
    this.serviceProvider.getUserDeposits().subscribe(response => {
      this.userDeposits = [];
      // alert(JSON.stringify(response));
      for (const key in response.data) {
        if (response.data.hasOwnProperty(key)) {
          const element = response.data[key];
          let e = { data: element, description: this.depositNameById(element.deposit_type) }
          this.userDeposits.push(e);
        }
      }
    });
  }

  private fetchUserCredits() {
    let params = { user_id: this.userId };
    this.serviceProvider.getUserCredits().subscribe(response => {
      this.userCredits = [];
      // alert(JSON.stringify(response));
      for (const key in response.data) {
        if (response.data.hasOwnProperty(key)) {
          const element = response.data[key];
          let e = { data: element, description: this.creditNameById(element.credit_type) }
          this.userCredits.push(e);
        }
      }
    });
  }

  private creditNameById(identifier) {
    let title = '';
    this.credits.forEach((credit) => {
      if (credit._id === identifier) {
        title = credit.description;
      }
    });
    return title;
  }

  private depositNameById(identifier) {
    let title = '';
    this.deposits.forEach((deposit) => {
      if (deposit._id === identifier) {
        title = deposit.description;
      }
    });
    return title;
  }

  public logout() { }
}