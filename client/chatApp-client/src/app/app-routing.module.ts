import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { SignupFormComponent } from './../app/signup-form/signup-form.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component'
import { ChatWindowComponent } from './chat-window/chat-window.component';
const routes: Routes = [
  { path: '', redirectTo: '/signUp', pathMatch: 'full' },
  { path: "signUp", component: SignupFormComponent },
  {
    path: "chat/:senderName", component: ChatComponent,
    children:[
      { path: ':receiverName', component: ChatWindowComponent,data:{ showChatWindow: true } },
    ]
  },
  
  { path: "login", component: LoginComponent }
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes,
  )]
})

export class AppRoutingModule { }
