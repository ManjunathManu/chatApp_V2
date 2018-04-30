import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';
import { AlertsService } from './alerts.service';
import { Alert } from './alert';
import 'rxjs/add/operator/toPromise'
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie-service';
import { Message } from './message';
@Injectable()
export class UserService {
  private userUrl = '/api/user';  // URL to web api

  constructor(
    private http: HttpClient,
    private alertService: AlertsService,
    private cookieService: CookieService
  ) { }

  signUp(user): Promise<any> {
    const url = `${this.userUrl}/signUp`
    return new Promise((resolve, reject) => {
      this.http.post(url, user, { observe: 'response' })
        .toPromise()
        .then((response:any) => {
          console.log("sign up api status--", response.body);
          this.cookieService.set('chatApp_V2', response.headers.get('authorization'));
          this.alertService.add(new Alert(true, "You have succesfully signed up"));
          resolve(response);
        })
        .catch((error) => {
          console.log("Sign up error--", error);
          this.alertService.add(new Alert(false, error.error.err));
          reject(error)
        })
    });
  }

  logIn(user): Promise<any> {
    const url = `${this.userUrl}/logIn`
    return new Promise((resolve, reject) => {
      this.http.post(url, user, { observe: 'response' })
        .toPromise()
        .then((response:any) => {
          console.log("log in api status--", response.body);
          this.cookieService.set('chatApp_V2', response.headers.get('authorization'));
          this.alertService.add(new Alert(true, "You have succesfully logged in"));
          resolve(response);
        })
        .catch((error) => {
          console.log("log in error--", error);
          this.alertService.add(new Alert(false, error.error.err));
          reject(error)
        })
    })
  }

  getAllUsers(): Observable<any> {
    const url = `${this.userUrl}/getAllUsers`
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': this.cookieService.get('chatApp_V2')
      })
    }
    return this.http.get(url,httpOptions)
      .pipe(
      tap(_ => console.log(`Fetched users`))
      )
  }

  getPrivateMessages(senderName, receiverName):Observable<any>{
    const url = `${this.userUrl}/chat/:senderName/:receiverName`
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': this.cookieService.get('chatApp_V2')
      })
    }

    return this.http.get(url, httpOptions)
    .pipe(
      tap ( _ => console.log('Fetched All private messaged'))
    )
  }

}
