import { NgModule } from '@angular/core';
import { RouterModule, Routes,CanActivate } from '@angular/router';
import { SignupFormComponent } from './../app/signup-form/signup-form.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { AuthGaurdService} from './auth-gaurd.service';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
const routes: Routes = [
  { path: '', redirectTo: '/signUp', pathMatch: 'full' },
  // { path: "login",canActivate:[AuthGaurdService], component: LoginComponent },
  // { path: "signUp", canActivate:[AuthGaurdService],component: SignupFormComponent },
  { path: "login", component: LoginComponent },
  { path: "signUp",component: SignupFormComponent },

  {
    path: "chat/:senderName",canActivate:[AuthGaurdService],canDeactivate:[!AuthGaurdService], component: ChatComponent,
    children:[
      { path: ':receiverName', component: ChatWindowComponent,data:{ showChatWindow: true } },
    ]
  },
  {path:'not-found',component:PageNotFoundComponent},
  {path:"**",redirectTo:'/not-found' ,pathMatch:'full'}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes,
  )]
})

export class AppRoutingModule { }
