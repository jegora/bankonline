import { Injectable } from "@angular/core";
import { IonicStorageModule } from "@ionic/storage";

@Injectable()
export class AppManager {
    constructor(private storage: IonicStorageModule) { }
}