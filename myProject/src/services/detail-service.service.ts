import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  private apiUrl = 'https://localhost:7035/api/details';

  constructor(private http: HttpClient) {}

  getDetails() {
    return this.http.get(this.apiUrl);
  }
}
