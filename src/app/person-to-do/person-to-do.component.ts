import { Component, inject } from '@angular/core';
import { ToDoService } from '../to-do.service';

@Component({
  selector: 'app-person-to-do',
  standalone: true,
  imports: [],
  templateUrl: './person-to-do.component.html',
  styleUrl: './person-to-do.component.css'
})
export class PersonToDoComponent {
  todoService = inject(ToDoService);
  pageTitle = 'Person Actions';
  
}
