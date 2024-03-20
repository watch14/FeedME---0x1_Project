import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-random-recipes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './random-recipes.component.html',
  styleUrl: './random-recipes.component.css'
})
export class RandomRecipesComponent {

}
