import { AlertController } from "ionic-angular";
import { Injectable } from "@angular/core";

@Injectable()
export class AlertPage {
    constructor(private alertController: AlertController) { }

    showErrorAlert(title: string, message: string) {
        let alert = this.alertController.create({
          title: title,
          subTitle: message,
          buttons: ['OK']
        });
        alert.present();
    }
}