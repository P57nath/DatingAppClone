import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  model: any = {};
  
    constructor(private authService: AuthService, private router: Router) {}
  
    register() {
      this.authService.register(this.model).subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: (error) => console.log(error)
      });
    }

}
