import { HttpClient } from '@angular/common/http';
import { PersonService } from './person.service';
import { Injectable ,inject} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  http = inject(HttpClient);
  userService = inject(PersonService);
  todoUrl = 'http://localhost:5049/api/Person/{id}';

  constructor() { }
}
