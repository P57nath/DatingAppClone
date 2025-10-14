import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDemoComponent } from './user-demo/user-demo.component';
import { AppComponent } from './app.component';

// const routes: Routes = [
//   { path: '', component: AppComponent },
//   { path: 'user-demo', component: UserDemoComponent }
// ];

const routes: Routes = [
  { path: '', redirectTo: '/user-demo', pathMatch: 'full' },
  { path: 'user-demo', component: UserDemoComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
