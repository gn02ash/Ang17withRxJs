import { Component,inject } from '@angular/core';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.css'
})
export class PersonListComponent {

  PersonService = inject(PersonService);

  pageTitle = 'People (only me and some weird letter combos) List';
}
