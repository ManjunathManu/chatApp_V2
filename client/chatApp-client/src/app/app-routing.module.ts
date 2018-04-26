import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { SignupFormComponent } from './../app/signup-form/signup-form.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent} from './login/login.component'
const routes: Routes = [
  { path: '', redirectTo: '/signUp', pathMatch: 'full' },
  { path: "signUp", component: SignupFormComponent },
  { path: "chat", component: ChatComponent },
  {path: "login", component:LoginComponent}
]

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})

export class AppRoutingModule { }