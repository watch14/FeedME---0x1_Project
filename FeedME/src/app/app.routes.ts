import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { RandomRecipesComponent } from './random-recipes/random-recipes.component';
import { RecipeComponent } from './recipe/recipe.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';

export const routes: Routes = [
    {'path': '', component:HomePageComponent},
    {'path': 'random_recipes', component:RandomRecipesComponent},
    {'path': 'recipe' , component:RecipeComponent},
    {'path': 'favorite', component:FavoritesComponent},
    {'path': 'contact_us', component:ContactUsComponent},
    {'path': 'about_us', component:AboutUsComponent},
];
