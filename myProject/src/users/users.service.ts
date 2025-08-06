import { Injectable } from '@angular/core';
import { User } from './user';
import { FullUser } from './fullUser';
import { Subject } from 'rxjs';
import { UserEn } from './userEn';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public user: User = new User();
  public fullUser: FullUser = new FullUser();
  public halfUser: UserEn = new UserEn();
  public enrol = false; // האם המשתמש מילא שם וסיסמה בהרשמה
  public f1 = false;    // האם להציג את מסך ההרשמה
  public f2 = false;    // האם להציג את מסך הכניסה
  public fEntry = true; // האם להציג את מסך הפתיחה (ENTRY)
  public enter = false; // האם המשתמש התחבר
  public menu: any = null;
  public menuSubject = new Subject<any>();
  public LessMenu = false; // האם להציג תפריט מקוצר
  constructor() { }
}