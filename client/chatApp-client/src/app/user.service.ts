import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';
import { AlertsService } from './alerts.service';
import { Alert } from './alert';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'angular2-cookie';
import { Message } from './message';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class UserService {
  private userUrl = '/api/user';  // URL to web api
  private tokenSource = new Subject<{isTokenPresent:boolean,userName:string}>();
   token$ = this.tokenSource.asObservable();
  constructor(
    private http: HttpClient,
    private alertService: AlertsService,
    private cookieService: CookieService
  ) { }

  public signUp(user): Promise<any> {
    const url = `${this.userUrl}/signUp`
    return new Promise((resolve, reject) => {
      this.http.post(url, user, { observe: 'response' })
        .toPromise()
        .then((response: any) => {
          console.log("sign up api status--", response.body);
          this.cookieService.put('chatApp_V2', response.headers.get('authorization'));
          this.cookieService.put('userName',response.body.user.userName);
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

  public logIn(user): Promise<any> {
    const url = `${this.userUrl}/logIn`
    return new Promise((resolve, reject) => {
      this.http.post(url, user, { observe: 'response' })
        .toPromise()
        .then((response: any) => {
          console.log("log in api status--", response.body);
          this.cookieService.put('chatApp_V2', response.headers.get('authorization'));
          this.cookieService.put('userName',response.body.user.userName);
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

  public getAllUsers(senderName): Observable<any> {
    const url = `${this.userUrl}/getAllUsers`;
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': this.cookieService.get('chatApp_V2'),
      }),
      params: {
        senderName: senderName
      }
    };
    return this.http.get(url, httpOptions)
      .pipe(
      tap(_ => console.log(`Fetched users`)),
      // map(user => console.log('user---',user))
    );
  }

  public isAuthenticated(): void {
    const token = this.cookieService.get('chatApp_V2');
    const userName = this.cookieService.get('userName');
    console.log('auth function')
    if (token) {
      // return Observable.of(true);
      // return new Observable(observer => observer.next(true));
      this.tokenSource.next({isTokenPresent: true,userName});
    } else {
      // return new Observable(observer => observer.next(false));
      // return Observable.of(false);
      this.tokenSource.next({isTokenPresent: false,userName});
    }
  }
}
