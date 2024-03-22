import { Component } from '@angular/core';
import { RandomRecipesComponent } from '../random-recipes/random-recipes.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [RandomRecipesComponent,HttpClientModule, CommonModule, MatProgressSpinnerModule,],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})


export class RecipeComponent {
  loading = false; // Initialize loading flag

  mealID: string = ''; // Initialize mealName with an empty string
  meal: {
    name: string;
    image: string;
    meal_id: string;
    description: string;
    youtube: string;
    area: string;
    category: string;
    instructions: string;
    ingredients: string[];
  } = {
    name: '',
    image: '',
    meal_id: '',
    description: '',
    youtube: '',
    area: '',
    category: '',
    instructions: '',
    ingredients: [],
  };

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    console.log('aa');
    // Retrieve the 'name' parameter from the route
    this.route.queryParams.subscribe((params) => {
      this.mealID = params['id'] || ''; // Assign params['name'] or an empty string if undefined
      console.log(this.mealID);
      this.fetchRandomRecipe();
    });
  }

  fetchRandomRecipe() {
    this.loading = true;
    this.http
      .get<any>('http://127.0.0.1:9000/get_meal_by_id/' + this.mealID)
      .subscribe(
        (response) => {
          this.meal.name = response.strMeal;
          this.meal.image = response.strMealThumb;
          this.meal.meal_id = this.mealID;
          this.meal.description = response.strInstructions;
          this.meal.youtube = response.strYoutube;
          this.meal.area = response.strArea;
          this.meal.category = response.strCategory;
          this.meal.ingredients = response.ingredients;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching meal:', error);
          this.loading = false;
        }
      );
  }
}