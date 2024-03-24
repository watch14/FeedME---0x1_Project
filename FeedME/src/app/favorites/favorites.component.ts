import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [RouterLink,
            RouterModule,
            HttpClientModule,
            CommonModule,
            ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
  countryName: string;
  meals: any[] = []; // Array to store fetched meals

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.countryName = params['country'];
      
      // Fetch meals for the specified country
      this.http.get<any[]>(`http://127.0.0.1:9000/get_meals_by_area/${this.countryName}`)
        .subscribe(response => {
          // Log the response in the console
          // Assign the response to the meals array for further use in the template
          this.meals = response;
        }, error => {
          console.error('Error fetching meals:', error);
        });
    });
  }

  redirectToRecipe(id: string) {
    this.router.navigate(['/recipe'], { queryParams: { id: id } });
  }

}