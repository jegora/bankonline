import { Storage } from "@ionic/storage";
import { Injectable } from "@angular/core";

const TOKEN_KEY = 'kTokenRecord'

@Injectable()
export class DBStorage {
    constructor(private db: Storage) { }

    saveToken(token: string) {
        this.db.set(TOKEN_KEY, token)
    }

    async getToken() {
        return this.db.get(TOKEN_KEY)
    }

    clearToken() {
        this.db.remove(TOKEN_KEY)
    }
}