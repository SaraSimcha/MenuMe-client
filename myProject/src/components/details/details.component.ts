import { Component, OnInit } from '@angular/core';
import { DetailsService } from '../../services/detail-service.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { UsersService } from '../../users/users.service';
import { Router } from '@angular/router';
import { LoadingComponent } from '../../app/shared/loading/loading.component';

@Component({
  selector: 'app-details-view',
  templateUrl: './details.component.html',
  standalone: true,
  styleUrls: ['./details.component.css'],
  imports: [CommonModule, HttpClientModule, LoadingComponent]
})
export class DetailsViewComponent implements OnInit {
  menu: any = null;
  remainingCalories: number | null = null; // הקלוריות שנותרו
  loading: boolean = true;//משתנה לטעינה
  //משתנים לאפשור לייק
  d1: boolean = false;
  d2: boolean = false;
  d3: boolean = false;
  d4: boolean = false;
  constructor(public us: UsersService, private api: ApiService) { }
  ngOnInit(): void {
    this.loading = true;// התחלת טעינה
    this.us.menuSubject.subscribe((menuData) => {
      if (menuData) {
        this.menu = menuData;
        this.remainingCalories = menuData.remain;
        this.loading = false; // סיום טעינה
        console.log('תפריט שהתקבל:', this.menu);
      } else {
        console.error('לא התקבל תפריט.');
        this.menu = null;
        this.remainingCalories = null;
        this.loading = false; // גם במקרה של כשל – להפסיק טעינה
      }
    });
  }
  getFoodGroupName(index: number): string {
    switch (index) {
      case 0: return 'פחמימות';
      case 1: return 'חלבונים';
      case 2: return 'שומנים';
      default: return '';
    }
  }
  onMealLike(mealGroup: any[], numOfMeal: Number): void {
    if (numOfMeal == 1) {
      this.d1 = !this.d1;
    }
    if (numOfMeal == 2) {
      this.d2 = !this.d2;
    }
    if (numOfMeal == 3) {
      this.d3 = !this.d3;
    }
    if (numOfMeal == 4) {
      this.d4 = !this.d4;
    }
    console.log('נשלח לשרת:', JSON.stringify(mealGroup));
    this.api.sendMealAfterLike(mealGroup).subscribe(
      (success: boolean) => {
        if (success) {
          console.log('לייק נוסף לארוחה:', mealGroup);
        } else {
          console.error('הוספת הלייק נכשלה.');
        }
      },
      (error) => {
        console.error('שגיאה בשליחת הלייק:', error);
      }
    );
  }
  newMenu(): void {
    this.loading = true;
    this.api.sendFormDataAfterEnter(this.us.halfUser).subscribe({
      next: (menuData) => {
        this.menu = menuData;
        this.remainingCalories = this.menu.remain;
        this.us.menuSubject.next(menuData);
        this.loading = false;
      },
      error: (err) => {
        console.error('שגיאה בקבלת תפריט חדש:', err);
        this.loading = false;
      }
    });
  }
}