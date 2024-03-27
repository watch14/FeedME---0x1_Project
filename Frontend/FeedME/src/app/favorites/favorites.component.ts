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
  countries: { strArea: string }[] = [
    { strArea: 'American' },
    { strArea: 'British' },
    { strArea: 'Canadian' },
    { strArea: 'Chinese' },
    { strArea: 'Croatian' },
    { strArea: 'Dutch' },
    { strArea: 'Egyptian' }, // African country
    { strArea: 'Filipino' },
    { strArea: 'French' },
    { strArea: 'Greek' },
    { strArea: 'Indian' },
    { strArea: 'Irish' },
    { strArea: 'Italian' },
    { strArea: 'Jamaican' },
    { strArea: 'Japanese' },
    { strArea: 'Kenyan' }, // African country
    { strArea: 'Malaysian' },
    { strArea: 'Mexican' },
    { strArea: 'Moroccan' },
    { strArea: 'Polish' },
    { strArea: 'Portuguese' },
    { strArea: 'Russian' },
    { strArea: 'Spanish' },
    { strArea: 'Thai' },
    { strArea: 'Tunisian' }, // African country
    { strArea: 'Turkish' },
    { strArea: 'Vietnamese' },
    { strArea: 'Unknown' },
  ];

  getFlagImageUrl(country: string): string {
    return `../../assets/images/flags/${country}.svg`;
  }


  countryName: string;
  meals: any[] = []; // Array to store fetched meals

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.countryName = params['country'];
      
      // Fetch meals for the specified country
      this.http.get<any[]>(`http://watch14.pythonanywhere.com/get_meals_by_area/${this.countryName}`)
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