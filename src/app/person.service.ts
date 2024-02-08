import { Injectable, WritableSignal, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from './person';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, retry } from 'rxjs';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  http = inject(HttpClient);
  personsUrl = 'http://localhost:5049/api/Person';

  private person$ = this.http.get<Person[]>(this.personsUrl);
  Persons: WritableSignal<Person[]> = signal([]);
  OnePerson: WritableSignal<Person> = signal({ id: 0, name: '', age: 0 });
  addPerson(person: Person) {
    this.http.post<Person>(this.personsUrl, person).subscribe((createdPerson) => {
      this.Persons.set([...this.Persons(), createdPerson]);

    })
  }

  id = signal(0);
  setselectedId(num: number) {
    this.id.set(num)
    this.getById(num);
    console.log("this id", this.id())
  }


  updatePerson(updatedPerson: Person): Person {
    this.http.put<Person>(this.personsUrl + "/" + updatedPerson.id, updatedPerson).subscribe(() => {
      this.Persons.set(this.Persons().map(person => (
        (person.id === updatedPerson.id),
        (person.name === updatedPerson.name),
        (person.age === updatedPerson.age) ? updatedPerson : person)));


    }
    )
    return updatedPerson;

  }



  deletePerson(): void {

    this.http.delete<number>(this.personsUrl + "/" + this.id()).subscribe(() => {
      this.Persons.set(this.Persons().filter(person => person.id !== this.id()));

    })
  }

 getById(id:number): void {
    this.http.get<Person>(this.personsUrl + "/" + id).subscribe((person) => {
      this.OnePerson.set(person);
    });
  }



 
  constructor() {
    this.person$.subscribe((newpeople) => {
      this.Persons.set(newpeople);
    })
  }
}
