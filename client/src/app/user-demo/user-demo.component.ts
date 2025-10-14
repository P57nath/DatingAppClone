import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService, ConfirmationService } from 'primeng/api';

interface User {
  id?: number;
  userName: string;
}

@Component({
  selector: 'app-user-demo',
  templateUrl: './user-demo.component.html',
  styleUrls: ['./user-demo.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class UserDemoComponent implements OnInit {
  users: User[] = [];
  userDialog: boolean = false;
  user: User = { userName: '' };
  submitted: boolean = false;
  apiUrl = 'https://localhost:5001/api/users';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<User[]>(this.apiUrl).subscribe({
      next: (res) => this.users = res,
      error: (err) => console.error(err)
    });
  }

  openNew() {
    this.user = { userName: '' };
    this.submitted = false;
    this.userDialog = true;
  }

  editUser(user: User) {
    this.user = { ...user };
    this.userDialog = true;
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.userName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.http.delete(`${this.apiUrl}/${user.id}`).subscribe({
          next: () => {
            this.users = this.users.filter(u => u.id !== user.id);
            this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'User deleted' });
          },
          error: (err) => console.error(err)
        });
      }
    });
  }

  saveUser() {
    this.submitted = true;
    if (!this.user.userName.trim()) return;

    if (this.user.id) {
      // Update existing user
      this.http.put(`${this.apiUrl}/${this.user.id}`, this.user).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'User updated' });
          this.userDialog = false;
          this.loadUsers();
        },
        error: (err) => console.error(err)
      });
    } else {
      // Create new user
      this.http.post(this.apiUrl, this.user).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Created', detail: 'User added' });
          this.userDialog = false;
          this.loadUsers();
        },
        error: (err) => console.error(err)
      });
    }
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }
}
