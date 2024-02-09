import { Injectable, WritableSignal, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Person } from './person';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, retry } from 'rxjs';
import { error } from 'console';
import { EditFormComponent } from './edit-form/edit-form.component';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  http = inject(HttpClient);
  personsUrl = 'http://localhost:5049/api/Person';
  private person$ = this.http.get<Person[]>(this.personsUrl);
  Persons: WritableSignal<Person[]> = signal([]);
  OnePerson: WritableSignal<Person> = signal({ id: 0, name: '', age: 0 });
  public errorMessage=signal<string>('')
  public showError=signal(false);

  addPerson(person: Person) {
    this.http.post<Person>(this.personsUrl, person).subscribe((createdPerson) => {
      this.Persons.set([...this.Persons(), createdPerson]),
        (err: HttpErrorResponse) => {
          this.errorMessage.set(err.message);
          console.log( "this is the error",this.errorMessage())
          this.showError.set(true);
        }
    });
  }
  id = signal(0);
  setselectedId(num: number) {
    this.id.set(num)
  }

  updatePerson(updatedPerson: Person) {
    this.http.put<Person>(this.personsUrl + "/" + updatedPerson.id, updatedPerson).subscribe(() => {
      this.Persons.set(this.Persons().map(
        (person) => (person.id == updatedPerson.id) ? updatedPerson : person))
        , (err: HttpErrorResponse) => {
          this.errorMessage.set(err.message);
          this.showError.set(true);
        }
    })
  }



  deletePerson(): void {

    this.http.delete<number>(this.personsUrl + "/" + this.id()).subscribe(() => {
      this.Persons.set(this.Persons().filter(person => person.id !== this.id())),
      (err: HttpErrorResponse) => {
        this.errorMessage.set(err.message);
        this.showError.set(true);
      }

    })
  }

  getById(id: number) {
    this.http.get<Person>(this.personsUrl + "/" + id).subscribe((person) => {
      this.OnePerson.set(person),
      (err: HttpErrorResponse) => {
        this.errorMessage.set(err.message);
        this.showError.set(true);
      };
    });
  }

  constructor() {
    this.person$.subscribe((newpeople) => {
      this.Persons.set(newpeople);
    })

  }
}
