import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { RandomRecipesComponent } from './random-recipes/random-recipes.component';
import { RecipeComponent } from './recipe/recipe.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ResualtComponent } from './resualt/resualt.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

export const routes: Routes = [
    {'path': '', component:HomePageComponent},
    {'path': 'random_recipes', component:RandomRecipesComponent},
    {'path': 'recipe' , component:RecipeComponent},
    {'path': 'favorite', component:FavoritesComponent},
    {'path': 'resualt', component:ResualtComponent},
    {'path': 'contact_us', component:ContactUsComponent},
];
