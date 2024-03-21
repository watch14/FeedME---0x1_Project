import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getMeals(mealName: string): Observable<any> {
    const url = `http://127.0.0.1:9000/search/${mealName}`;
    return this.http.get<any>(url);
  }
}