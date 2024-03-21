import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactUsComponent } from '../contact-us/contact-us.component';


@Component({
  selector: 'app-resualt',
  standalone: true,
  imports: [RouterLink, ContactUsComponent],
  templateUrl: './resualt.component.html',
  styleUrl: './resualt.component.css'
})
export class ResualtComponent {

}
