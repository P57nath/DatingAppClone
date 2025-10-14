import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-user-demo',
  templateUrl: './user-demo.component.html',
  styleUrls: ['./user-demo.component.css']
})
export class UserDemoComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = {};
  displayDialog = false;
  baseUrl = 'https://localhost:5001/api/users';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private confirmService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<any[]>(this.baseUrl).subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Error loading users:', err)
    });
  }

  openNew() {
    this.selectedUser = {};
    this.displayDialog = true;
  }

  editUser(user: any) {
    this.selectedUser = { ...user };
    this.displayDialog = true;
  }

  deleteUser(user: any) {
    this.confirmService.confirm({
      message: `Are you sure you want to delete ${user.userName}?`,
      accept: () => {
        // Placeholder: call delete API later
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'User deleted successfully' });
      }
    });
  }

  saveUser() {
    // Placeholder: add API call later
    this.displayDialog = false;
    this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'User saved successfully' });
  }
}
