import { Injectable, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Person } from './person';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PersonService {
  http = inject(HttpClient);
  personsUrl = 'http://localhost:5049/api/Person';
  private person$ = this.http.get<Person[]>(this.personsUrl);
  Persons: WritableSignal<Person[]> = signal([]);
  OnePerson: WritableSignal<Person> = signal({ id: 0, name: '', age: 0 });
  showNameError = signal(false);
  showAgeError = signal(false);
  public NameErrorMessage = signal('');
  public AgeErrorMessage = signal('');
  addPerson(person: Person) {
    this.http.post<Person>(this.personsUrl, person).subscribe((createdPerson) => {
      this.Persons.set([...this.Persons(), createdPerson])
    }, (error: HttpErrorResponse) => {

      if (error && error.error && error.error.includes('Age')) {
        const validationErrors1 = error.error.split('Validation failed:')[1].trim();
        const fieldErrorMessage1 = validationErrors1.match(/-- Age: (.*) Severity:/);
        if (fieldErrorMessage1) {
          this.AgeErrorMessage.set(fieldErrorMessage1[1].trim());
          this.showAgeError.set(true);
        } else {
          this.AgeErrorMessage.set('');
        }
      };
      if (error && error.error && error.error.includes('Name')) {
        const validationErrors1 = error.error.split('Validation failed:')[1].trim();
        const fieldErrorMessage1 = validationErrors1.match(/-- Name: (.*) Severity:/);
        if (fieldErrorMessage1) {
          this.NameErrorMessage.set(fieldErrorMessage1[1].trim());
          this.showNameError.set(true);
        } else {
          this.NameErrorMessage.set('');
        }
      };

    })
  }

  id = signal(0);
  setselectedId(num: number) {
    this.id.set(num)
  }

  updatePerson(updatedPerson: Person) {
    this.http.put<Person>(this.personsUrl + "/" + updatedPerson.id, updatedPerson).subscribe(() => {
      this.Persons.set(this.Persons().map(
        (person) => (person.id == updatedPerson.id) ? updatedPerson : person))
    })

  }



  deletePerson(num: number): void {

    this.http.delete<number>(this.personsUrl + "/" + num).subscribe(() => {
      this.Persons.set(this.Persons().filter(person => person.id !== num))

    })
  }

  getById(id: number) {
    this.http.get<Person>(this.personsUrl + "/" + id).subscribe((person) => {
      this.OnePerson.set(person)
    });
  }

  constructor() {
    this.person$.subscribe((newpeople) => {
      this.Persons.set(newpeople);
    })
    console.log("here GG")
  }
}
