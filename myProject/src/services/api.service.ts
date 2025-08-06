import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserEn } from "../users/userEn";
import { FullUser } from "../users/fullUser";
import { User } from "../users/user";

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'https://localhost:7035/api/details';

  constructor(private http: HttpClient) { }

  // שליחת נתונים אחרי הרשמה
  sendFormDataAfterEnroll(newUser: FullUser) {
    return this.http.post(`${this.baseUrl}/Enroll`, newUser);
  }

  // שליחת נתונים אחרי כניסה
  sendFormDataAfterEnter(findUser: UserEn) {
    return this.http.post(`${this.baseUrl}/Enter`, findUser);
  }

  // קבלת תפריט אחרון אחרי כניסה
  getMenuAfterEnter(fUser: User) {
    return this.http.post(`${this.baseUrl}/LessMenu`, fUser);
  }

  // שליחת נתונים אחרי לייק
  sendMealAfterLike(LikeMeal: any) {
    console.log('Sending LikeMeal to server:', LikeMeal);
    return this.http.post<boolean>(`${this.baseUrl}/Like`, LikeMeal);
  }
}
