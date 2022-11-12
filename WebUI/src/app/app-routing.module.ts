import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { SignUpViewComponent } from './views/sign-up-view/sign-up-view.component';

const routes: Routes = [
  { path: 'sign-up', component: SignUpViewComponent },
  { path: 'login', component: LoginViewComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
