import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-country',
  standalone: true,
  imports: [RouterLink,
            RouterModule,
            CommonModule,
            ],
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export class CountryComponent {
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

  constructor(private http: HttpClient, private router: Router) {}

  redirectToRecipe(country: string) {
    // Example: Navigate to a route with country parameter
    this.router.navigate(['/favorite', { country: country }]);
  }

  getFlagImageUrl(country: string): string {
    return `../../assets/images/flags/${country}.svg`;
  }
}