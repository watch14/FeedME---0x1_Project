import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {AsyncPipe, CommonModule} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Ingredient {
  name: string;
  image: string;
}

/**
 * @title Autocomplete overview
 */
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
    CommonModule
  ],
})



export class AutocompleteComponent implements OnInit {
  ingredientCtrl = new FormControl('');
  filteredIngredients: Observable<Ingredient[]>;
  selectedIngredients: Ingredient[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.filteredIngredients = this.ingredientCtrl.valueChanges.pipe(
      startWith(''),
      map(ingredient => (ingredient && ingredient.length >= 3 ? this._filterIngredients(ingredient) : []))
    );

    this.fetchIngredients();
  }

  private fetchIngredients(): void {
    this.http.get<Ingredient[]>('http://127.0.0.1:9000/ingredients')
      .subscribe(ingredients => {
        this.selectedIngredients = ingredients;
      });
  }

  private _filterIngredients(value: string): Ingredient[] {
    const filterValue = value.toLowerCase();
    return this.selectedIngredients.filter(ingredient => ingredient.name.toLowerCase().includes(filterValue)).slice(0, 2);
  }

  removeSelectedIngredient(ingredient: Ingredient) {
    const index = this.selectedIngredients.indexOf(ingredient);
    if (index >= 0) {
      this.selectedIngredients.splice(index, 1);
    }
  }

  addSelectedIngredient(ingredient: Ingredient) {
    // Check if the ingredient is already selected
    const selectedIngredient = this.ingredientCtrl.value as Ingredient | null;
    if (selectedIngredient && selectedIngredient.name === ingredient.name) {
      if (!this.selectedIngredients.some(s => s.name === ingredient.name)) {
        this.selectedIngredients.push(ingredient);
        this.ingredientCtrl.setValue(''); // Reset the input text
      }
    }
  }

  onOptionSelected(event: any, ingredient: Ingredient) {
    event.stopPropagation();
    this.addSelectedIngredient(ingredient);
  }
}