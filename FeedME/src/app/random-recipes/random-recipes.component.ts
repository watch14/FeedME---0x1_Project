import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@Component({
  selector: 'app-random-recipes',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule, MatProgressSpinnerModule,],
  templateUrl: './random-recipes.component.html',
  styleUrls: ['./random-recipes.component.css'] // Corrected property name
})

export class RandomRecipesComponent {
  constructor(private http: HttpClient) { }

  meals: { name: string, image: string }[] = [];
  loading = false; // Initialize loading flag
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;

  ngOnInit() {
    this.fetchRandomRecipes();
  }

  fetchRandomRecipes() {
    this.loading = true; // Set loading flag to true when fetching data
    const url = 'http://127.0.0.1:9000/random';
    this.http.get<any[]>(url).subscribe(
      (data) => {
        console.log(data);
        this.meals = data.map(meal => ({
          name: meal.strMeal,
          image: meal.strMealThumb
        }));
        console.log(this.meals);
        this.loading = false; // Set loading flag to false after data is fetched
      },
      (error) => {
        console.error('Error fetching random recipes:', error);
        this.loading = false; // Set loading flag to false if there's an error
      }
    );
  }
}