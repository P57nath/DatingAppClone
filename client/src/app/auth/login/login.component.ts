import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  model: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.model).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (error) => console.log(error)
    });
  }
}
