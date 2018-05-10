import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './../app/user.service';
import {SocketsService} from './../app/sockets.service'
import { ChatComponent } from './chat/chat.component';
import { AlertsComponent } from './alerts/alerts.component'
import { AlertsService } from './alerts.service';
import { LoginComponent } from './login/login.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { MessageComponent } from './message/message.component';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { NavbarComponent } from './navbar/navbar.component';
import {MaterialModule} from './material/material.module';

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
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
