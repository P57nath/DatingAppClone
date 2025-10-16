import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: any = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  login() {
    this.authService.login(this.model).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Welcome!', detail: 'Login successful.' });
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: 'Invalid credentials.' });
      }
    });
  }
}
