import { Component } from '@angular/core';
import { UsersService } from '../../users/users.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-entry',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.css'
})
export class EntryComponent {
  constructor(public us: UsersService) { }

  register() {
    this.us.fEntry = false; // מסתיר את מסך הפתיחה
    this.us.f1 = true;      // מציג את מסך ההרשמה
    this.us.f2 = false;     // ודא שמסך הכניסה מוסתר
  }

  enter() {
    this.us.fEntry = false; // מסתיר את מסך הפתיחה
    this.us.f2 = true;      // מציג את מסך הכניסה
    this.us.f1 = false;     // ודא שמסך ההרשמה מוסתר
  }
}