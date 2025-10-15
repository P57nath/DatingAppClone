import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Dating App';
  users: any;
  currentYear = new Date().getFullYear();
  genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' }
  ];

  selectedGender: string | undefined;
  seekingGender: string | undefined;
  ageFrom = 18;
  ageTo = 35;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (response: any) => this.users = response,
      error: (error: any) => console.log(error),
      complete: () => console.log('Request completed')
    });
  }

  loveStories = [
  {
    couple: 'Manfred & Echo',
    title: 'Across the World to Love',
    description: 'They found each other across continents — now happily married.',
    photo: 'assets/couple1.jpg'
  },
  {
    couple: 'Sakib Khan & Apu Biswas',
    title: 'From Chat to Forever',
    description: 'A casual chat turned into a lifelong connection full of joy.',
    photo: 'assets/couple2.jpg'
  },
  {
    couple: 'Romeo & Juliet',
    title: 'A Love Built on Trust',
    description: 'They met online and built a beautiful family together.',
    photo: '/assets/couple3.jpg'
  }
];
}
