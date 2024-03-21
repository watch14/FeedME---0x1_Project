import { Component } from '@angular/core';
import { RandomRecipesComponent } from '../random-recipes/random-recipes.component';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [RandomRecipesComponent],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {

}
