import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import {MaterialModule} from './material/material.module';
import { AppRoutingModule } from './app-routing.module';

import { UserService } from './../app/user.service';
import {SocketsService} from './../app/sockets.service'
import { AlertsService } from './alerts.service';

import { AppComponent } from './app.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { ChatComponent } from './chat/chat.component';
import { AlertsComponent } from './alerts/alerts.component'
import { LoginComponent } from './login/login.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { MessageComponent } from './message/message.component';
import { NavbarComponent } from './navbar/navbar.component';
import {AuthGaurdService} from './auth-gaurd.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    ChatComponent,
    AlertsComponent,
    LoginComponent,
    ChatListComponent,
    ChatWindowComponent,
    MessageComponent,
    NavbarComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [
    UserService,
    AlertsService,
    SocketsService,
    CookieService,
    AuthGaurdService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
