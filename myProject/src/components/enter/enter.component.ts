import { Component } from '@angular/core';
import { UsersService } from '../../users/users.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'enter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './enter.component.html',
  styleUrl: './enter.component.css'
})
export class EnterComponent {
  preferenceLabels: string[] = [
    'צמחוני',
    'טבעוני',
    'ארוחת צהריים בשרית',
    'ארוחת ערב בשרית',
    'ארוחת בוקר חלבית',
    'ארוחת ערב חלבית'
  ];
  showPreferences = false; // דגל האם להציג את טופס ההעדפות

  favorite: string = "";// מועדף על המשתמש
  
  constructor(public us: UsersService, public api: ApiService) { }

  onPreferenceChange(event: Event, index: number): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.us.halfUser.Prefer[index] = isChecked ? 1 : 0;
  }

  EnterUser() {
    if (this.us.user) {
      this.showPreferences = true; // מציג את טופס ההעדפות בלבד!
    }
  }

  EnterPrefer() {
    this.us.halfUser.UserName = this.us.user.UserName;
    this.us.halfUser.Password = this.us.user.Password;
    this.us.halfUser.FavoriteFoods = this.favorite; // מועדף על המשתמש
    this.us.enter = true;   // המשתמש נכנס
    this.us.f2 = false;     // מסתיר את קומפוננטת enter
    this.us.fEntry = false;
    this.api.sendFormDataAfterEnter(this.us.halfUser).subscribe(
      (res: any) => {
        this.us.menu = res;
        this.us.menuSubject.next(res);
      },
      (err) => {
        console.error('שגיאה בשליחה לשרת', err);
      }
    );
  }

  LessMenu() {
    this.us.LessMenu = true;
    this.us.fEntry = false;
    this.us.enter = true;
    this.us.f2 = false;
    this.api.getMenuAfterEnter(this.us.user).subscribe(
      (res: any) => {
        this.us.menu = res;
        this.us.menuSubject.next(res);
        this.us.fEntry = false;
      },
      (err) => {
        console.error('שגיאה בשליחה לשרת', err);
      }
    );
  }
}