import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CountryComponent } from '../country/country.component';
import { RandomRecipesComponent } from '../random-recipes/random-recipes.component';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink,
            RouterModule,
            RandomRecipesComponent,
            CountryComponent,
            AutocompleteComponent
          ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}