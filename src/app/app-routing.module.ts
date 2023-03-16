import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { MenuComponent } from './pages/menu/menu.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { CartComponent } from './pages/cart/cart.component';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'account', redirectTo:"",children:[
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
  ]},
  { path: 'cart', component: CartComponent },
  { path: 'admin', component: AdminComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
