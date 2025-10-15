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
      { label: 'UserDemo', icon: 'pi pi-users', routerLink: '/user-demo' }
    ];
  }
}
