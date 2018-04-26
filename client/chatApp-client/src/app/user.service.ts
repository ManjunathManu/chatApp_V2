import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';
import { AlertsService} from './alerts.service';
import { Alert } from './alert';
import 'rxjs/add/operator/toPromise'
import { Observable } from 'rxjs/Observable';
@Injectable()
export class UserService {
  private userUrl = '/api/user';  // URL to web api

  constructor(
    private http: HttpClient,
    private alertService : AlertsService
  ) { }

  signUp(user):Promise<Object> {
    const url = `${this.userUrl}/signUp`
    return new Promise((resolve, reject) => {
      this.http.post(url, user)
        .toPromise()
        .then((status) => {
          console.log("sign up api status--", status);
          this.alertService.add(new Alert(true,"You have succesfully signed up"));
          resolve(status);
        })
        .catch((error)=>{
          console.log("Sign up error--",error);
          this.alertService.add(new Alert(false,error.error.err));
          reject(error)
        })
    });
  }

  logIn(user):Promise<Object>{
    const url = `${this.userUrl}/logIn`
    return new Promise((resolve, reject)=>{
      this.http.post(url, user)
      .toPromise()
      .then((status) => {
        console.log("log in api status--", status);
        this.alertService.add(new Alert(true,"You have succesfully logged in"));
        resolve(status);
      })
      .catch((error)=>{
        console.log("log in error--",error);
        this.alertService.add(new Alert(false,error.error.err));
        reject(error)
      })
    })
  }

  getAllUsers():Observable<any>{
    const url = `${this.userUrl}/getAllUsers`
    return this.http.get(url)
    .pipe(
      tap(_ => console.log(`Fetched users`))
      // catchError(_ => console.log('Error while fetching all users'))
      )
  }
}
