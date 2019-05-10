import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

export class ResponseObject {
  statusCode: number;
  data: Object;

  constructor(code: number = 0, data?: Object) {
    this.statusCode = code;
    this.data = data;
  }
}

let APIEndpoints = Object.freeze({
  users: "/users",
  user: "/user",
  deposits: "/deposits",
  credits: "/credits",
  userCredits: "/userCredits",
  userDeposits: "/userDeposits"
})

@Injectable()
export class ServiceProvider {

  serverUrl = 'http://localhost:3000'


  constructor(private httpClient: HttpClient) { }

  private getRequest(method: string, params?: string): Observable<ResponseObject> {
    let url = `${this.serverUrl}${method}?${params}`

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response'
    };

    return Observable.create((observer) => {
      this.httpClient.get(url, httpOptions).subscribe(data => {
        let { status, body } = data
        observer.next(new ResponseObject(status, body))
        observer.complete()
      }, responseError => {
        let { status, error } = responseError
        observer.next(new ResponseObject(status, error))
        observer.complete()
      })
    })
  }

  private postRequest(endpoint: string, params?: Object): Observable<ResponseObject> {
    let url = `${this.serverUrl}${endpoint}`

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response' as 'response'
    };

    return Observable.create((observer) => {
      this.httpClient.post(url, params, httpOptions).subscribe(responseData => {
        let { status, body } = responseData
        observer.next(new ResponseObject(status, body))
        observer.complete()
      }, responseError => {
        let { status, error } = responseError
        observer.next(new ResponseObject(status, error))
        observer.complete()
      })
    })
  }

  public getUsers() {
    return this.getRequest(APIEndpoints.users);
  }

  public login(credentials) {
    let { email, password } = credentials;
    return this.getRequest(APIEndpoints.user, `email=${email}&password=${password}`);
  }

  public add(credentials) {
    return this.postRequest(APIEndpoints.user, credentials);
  }

  public getDeposits() {
    return this.getRequest(APIEndpoints.deposits);
  }

  public getCredits() {
    return this.getRequest(APIEndpoints.credits);
  }

  public addUserCredit(parameters) {
    return this.postRequest(APIEndpoints.userCredits, parameters);
  }

  public addUserDeposit(parameters) {
    return this.postRequest(APIEndpoints.userDeposits, parameters);
  }

  public getUserDeposits() {
    return this.getRequest(APIEndpoints.userDeposits);
  }

  public getUserCredits() {
    return this.getRequest(APIEndpoints.userCredits);
  }
}