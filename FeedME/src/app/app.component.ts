import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RandomRecipesComponent } from './random-recipes/random-recipes.component';
import { RecipeComponent } from './recipe/recipe.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ResualtComponent } from './resualt/resualt.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,
            RouterOutlet, 
            HeaderComponent, 
            FooterComponent, 
            HomePageComponent, 
            RandomRecipesComponent, 
            RecipeComponent, 
            FavoritesComponent,
            ResualtComponent,
            ContactUsComponent,
          ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FeedME';

}
