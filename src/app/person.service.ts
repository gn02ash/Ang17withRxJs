import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from './person';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  http = inject(HttpClient);
  personsUrl = 'http://localhost:5049/api/Person';

  //retrieve list of people
  private person$ = this.http.get<Person[]>(this.personsUrl);
  //expose signal
  //persons=toSignal(this.person$,  {initialValue:[]as Person[]})

  selectedPersonId=signal<number>(0);
  Persons: WritableSignal<Person[]> = signal([]);
  OnePerson: WritableSignal<Person> = signal({ id: 1, name: '', age: 15 });
 
  addPerson(person: Person) {
    this.http.post<Person>(this.personsUrl, person).subscribe((createdPerson) => {
      this.Persons.set([...this.Persons(), createdPerson])
    })
  }
  updatePerson(updatedPerson: Person): Person {
    this.http.put<Person>(this.personsUrl + "/" + updatedPerson.id, updatedPerson).subscribe(() => {
      this.Persons.set(this.Persons().map(person => (
        (person.id === updatedPerson.id),
        (person.name === updatedPerson.name),
        (person.age === updatedPerson.age) ? updatedPerson : person)))
    })
    return updatedPerson;
  }
  deletePerson(personId: number): void {
    this.http.delete<void>(this.personsUrl + "/" + personId).subscribe(() => {
      this.Persons.set(this.Persons().filter(person => person.id !== personId));
    })
  }
  id = signal(0);
  getById(id:number): void {
    this.http.get<Person>(this.personsUrl + "/" + id).subscribe((person) => {
      (this.OnePerson.set(person))
    })
  }
  getById2(PersonId: number): Person {
    this.http.get<Person>(this.personsUrl + "/" + PersonId).subscribe(

      (person) => {
        (this.OnePerson.set(person))
      })
    return this.OnePerson();
  }
  constructor() {
    this.person$.subscribe((newpeople) => {
      this.Persons.set(newpeople);
    })
  }
}
