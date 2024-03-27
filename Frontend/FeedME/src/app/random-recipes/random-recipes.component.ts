import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Router } from '@angular/router';




@Component({
  selector: 'app-random-recipes',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule, MatProgressSpinnerModule,],
  templateUrl: './random-recipes.component.html',
  styleUrls: ['./random-recipes.component.css'] // Corrected property name
})

export class RandomRecipesComponent {
  constructor(private http: HttpClient, private router: Router) { }

  meals: { name: string, image: string , meal_id: string}[] = [];
  loading = false; // Initialize loading flag
  
  ngOnInit() {
    this.fetchRandomRecipes();
  }

  redirectToRecipe(id: string) {
    this.router.navigate(['/recipe'], { queryParams: { id: id } });
  }

  fetchRandomRecipes() {
    this.loading = true; // Set loading flag to true when fetching data
    
    const url = 'http://watch14.pythonanywhere.com/random';
    this.http.get<any[]>(url).subscribe(
      (data) => {
        console.log(data);
        this.meals = data.map(meal => ({
          name: meal.strMeal,
          image: meal.strMealThumb,
          meal_id: meal.meal_id,
        }));
        this.loading = false; // Set loading flag to false after data is fetched
      },
      (error) => {
        console.error('Error fetching random recipes:', error);
        this.loading = false; // Set loading flag to false if there's an error
      }
    );
  }
}