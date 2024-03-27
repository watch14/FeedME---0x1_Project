import {Component, ViewChild} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {AsyncPipe, CommonModule} from '@angular/common';
import {MatAutocompleteModule, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

export interface Ingredient {
  name: string;
  image: string;
}


@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    AsyncPipe,
    CommonModule,
    MatAutocompleteModule,
    RouterLink,
    MatProgressSpinner
  ],
})



export class AutocompleteComponent {
  ingredientCtrl = new FormControl();
  allIngredients: Ingredient[] = [];
  filteredIngredients: Ingredient[] = [];
  selectedIngredients: Ingredient[] = [];
  @ViewChild('auto') auto: any;
  meals: { name: string, image: string, meal_id: string }[] = [];
  loading: boolean = false;
  showNoRecipesMessage: boolean = false; // Control the visibility of the message

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchIngredients();
  }

  private fetchIngredients(): void {
    this.http.get<Ingredient[]>('https://watch14.pythonanywhere.com/ingredients')
      .subscribe(ingredients => {
        this.allIngredients = ingredients;
        this.filteredIngredients = [...this.allIngredients];
      });
  }

  onOptionSelected(ingredient: Ingredient) {
    this.addSelectedIngredient(ingredient);
  }

  removeSelectedIngredient(ingredient: Ingredient) {
    const index = this.selectedIngredients.indexOf(ingredient);
    if (index !== -1) {
      this.selectedIngredients.splice(index, 1);
      this.filteredIngredients.push(ingredient);
    }
  }

  addSelectedIngredient(ingredient: Ingredient) {
    if (!this.selectedIngredients.some(s => s.name === ingredient.name)) {
      this.selectedIngredients.push(ingredient);
      this.filteredIngredients = this.filteredIngredients.filter(item => item.name !== ingredient.name);
      this.ingredientCtrl.setValue('');
    }
  }

  onInputChange(event: any) {
    const inputText = event.target.value.trim();
    if (inputText.length >= 1) {
      this.filteredIngredients = this.filterIngredients(inputText).slice(0, 10);
      this.auto.openPanel();
    } else {
      this.filteredIngredients = [...this.allIngredients];
      this.auto.closePanel();
    }
  }

  filterIngredients(value: string): Ingredient[] {
    const filterValue = value.toLowerCase();
    return this.allIngredients.filter(ingredient =>
      ingredient.name.toLowerCase().includes(filterValue)
    );
  }

  displayFn(ingredient: Ingredient): string {
    return ingredient ? ingredient.name : '';
  }

  redirectToRecipe(id: string) {
    this.router.navigate(['/recipe'], { queryParams: { id: id } });
  }

  submitIngredients() {
    this.loading = true;
    this.meals = [];
    const ingredientNames = this.selectedIngredients.map(ingredient => ingredient.name);
    const requestBody = { ingredients: ingredientNames };

    this.http.post<any>('https://watch14.pythonanywhere.com/get_food_with_ingredients', requestBody)
      .subscribe(
        (response) => {
          console.log('Response from server:', response);
          this.meals = response.map((meal: any) => ({
            name: meal.strMeal,
            image: meal.strMealThumb,
            meal_id: meal.idMeal
          }));
          this.loading = false;
          this.showNoRecipesMessage = this.meals.length === 0; // Show the message if no recipes found
        },
        (error) => {
          console.error('Error occurred while fetching meals:', error);
          this.loading = false;
        }
      );
  }
}