import { Component } from '@angular/core';
import { UsersService } from '../../users/users.service';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'enrollment',
  imports: [FormsModule, CommonModule],
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent {
  preferenceLabels: string[] = [
    'צמחוני',
    'טבעוני',
    'ארוחת צהריים בשרית',
    'ארוחת ערב בשרית',
    'ארוחת בוקר חלבית',
    'ארוחת ערב חלבית'
  ];

  showCredentials = true;
  showDetails = false;
  showPreferences = false;

  favorite: string = "";// מועדף על המשתמש
  
  constructor(public us: UsersService, public api: ApiService) { }

  onPreferenceChange(event: Event, index: number): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.us.fullUser.Prefer[index] = isChecked ? 1 : 0;
    this.us.halfUser.Prefer[index] = isChecked ? 1 : 0;
  }

  AddUser() {
    if (this.us.user) {
      this.showCredentials = false;
      this.showDetails = true;
    }
  }

  SubmitDetails() {
    this.showDetails = false;
    this.showPreferences = true;
  }

  AddFullUser() {
    this.us.fullUser.UserName = this.us.user.UserName;
    this.us.fullUser.Password = this.us.user.Password;

    this.us.halfUser.UserName = this.us.user.UserName;
    this.us.halfUser.Password = this.us.user.Password;

    this.us.fullUser.Details[0] = this.us.fullUser.Gender == "female" ? 0 : 1;

    this.us.fullUser.Details[4] = this.us.fullUser.Activity == "1" ? 1 :
      this.us.fullUser.Activity == "2" ? 2 :
      this.us.fullUser.Activity == "3" ? 3 :
      this.us.fullUser.Activity == "4" ? 4 : 5;
    this.us.fullUser.FavoriteFoods = this.favorite; // מועדף על המשתמש

    this.us.enrol = true;
    this.us.f1 = false;
    this.us.fEntry = false;

    this.api.sendFormDataAfterEnroll(this.us.fullUser).subscribe(
      (res) => {
        this.us.menu = res;
        this.us.menuSubject.next(res);
      },
      (err) => {
        console.error('שגיאה בשליחה לשרת', err);
      }
    );
  }
}