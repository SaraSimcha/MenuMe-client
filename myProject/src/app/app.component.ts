import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { EntryComponent } from '../components/entry/entry.component';
import { EnterComponent } from '../components/enter/enter.component';
import { EnrollmentComponent } from '../components/enrollment/enrollment.component';
import { DetailsViewComponent } from '../components/details/details.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-root',
  imports: [EntryComponent, EnterComponent, EnrollmentComponent,
    DetailsViewComponent, HttpClientModule, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'MenuMe';
  isEntryPage = false;

  constructor(public us: UsersService, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isEntryPage = this.router.url.includes('/entry'); // עדכני אם נתיב שונה
      });
  }

  goToEntry() {
    this.us.fEntry = true;
  }
}
