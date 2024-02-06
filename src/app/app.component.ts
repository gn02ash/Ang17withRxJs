import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PersonListComponent } from './person-list/person-list.component';
import {PersonToDoComponent} from './person-to-do/person-to-do.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PersonListComponent,PersonToDoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Ang_PW2_Front';
}
