import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dating App';
  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      { label: 'Home', icon: 'pi pi-home', routerLink: '/' },
      { label: 'Login', icon: 'pi pi-sign-in', routerLink: '/login' },
      { label: 'Register', icon: 'pi pi-user-plus', routerLink: '/register' },
      { label: 'User Demo', icon: 'pi pi-users', routerLink: '/user-demo' }
    ];
  }
}
