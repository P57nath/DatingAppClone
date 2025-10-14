import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserDemoComponent } from './user-demo/user-demo.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user-demo', component: UserDemoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
