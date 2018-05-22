import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CookieService } from 'angular2-cookie';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable()
export class AuthGaurdService implements CanActivate {

  constructor(private cookieService: CookieService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const token = this.cookieService.get('chatApp_V2');
    console.log('can activate---', state.url)
    if (token) {
      // return Observable.of(true);
      return new Observable(observer => {
        //guard check for login and signup
        /* if(state.url == '/login' ||state.url == '/signUp' ){
           let userName = this.cookieService.get('userName')
           this.router.navigateByUrl(`/chat/${userName}`);
           observer.next(false);
         }else{
           observer.next(true);
         }*/

        observer.next(true);
      });
    } else {
      // return Observable.of(false);
      return new Observable(observer => {
        //guard check for login and signup
        /*if(state.url == '/login'  ||state.url == '/signUp'){
          observer.next(true);
        }else{
          this.router.navigateByUrl('/login');
          observer.next(false)};
        });*/
        this.router.navigateByUrl('/login');
        observer.next(false);
      });
    }
  }
}