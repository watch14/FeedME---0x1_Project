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
    RouterLink
  ],
})



export class AutocompleteComponent {
  ingredientCtrl = new FormControl();
  allIngredients: Ingredient[] = [];
  filteredIngredients: Ingredient[] = [];
  selectedIngredients: Ingredient[] = [];
  @ViewChild('auto') auto!: MatAutocompleteTrigger;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchIngredients();
  }

  private fetchIngredients(): void {
    this.http.get<Ingredient[]>('http://127.0.0.1:9000/ingredients')
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
      this.filteredIngredients.push(ingredient); // Add the ingredient back to filteredIngredients
    }
  }

  addSelectedIngredient(ingredient: Ingredient) {
    if (!this.selectedIngredients.some(s => s.name === ingredient.name)) {
      this.selectedIngredients.push(ingredient);
      this.filteredIngredients = this.filteredIngredients.filter(item => item.name !== ingredient.name); // Remove the selected ingredient from filteredIngredients
      this.ingredientCtrl.setValue(''); // Reset the input text
    }
  }

  onInputChange(event: any) {
    const inputText = event.target.value.trim();
    if (inputText.length >= 1) {
      this.filteredIngredients = this.filterIngredients(inputText).slice(0, 10);
      this.auto.openPanel();
    } else {
      this.filteredIngredients = [...this.allIngredients]; // Show all ingredients if input text is less than 2 characters
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

 
}