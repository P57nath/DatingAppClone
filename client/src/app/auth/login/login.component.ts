import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {}

  login() {
    this.http.post('https://localhost:5001/api/account/login', this.model).subscribe({
      next: (response: any) => {
        this.messageService.add({ severity: 'success', summary: 'Welcome!', detail: 'Login successful.' });
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: 'Invalid credentials.' });
      }
    });
  }
}
