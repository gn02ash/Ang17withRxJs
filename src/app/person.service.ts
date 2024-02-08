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

 

  selectedPersonId=signal<number>(0);
  Persons: WritableSignal<Person[]> = signal([]);
  OnePerson: WritableSignal<Person> = signal({ id: 1, name: '', age: 15 });
 



  addPerson(person: Person) {
    this.http.post<Person>(this.personsUrl, person).subscribe((createdPerson) => {
      this.Persons.set([...this.Persons(), createdPerson]);
      ( error: any)=>console.log("hey you have an   ERROR ",error)
    })
  }
  setSelectedPerson(id: number) {
    this.selectedPersonId.set(id);
    this.getById();
    console.log("this id", this.selectedPersonId)
  }


  updatePerson(updatedPerson: Person): Person {
    this.http.put<Person>(this.personsUrl + "/" + updatedPerson.id, updatedPerson).subscribe(() => {
      this.Persons.set(this.Persons().map(person => (
        (person.id === updatedPerson.id),
        (person.name === updatedPerson.name),
        (person.age === updatedPerson.age) ? updatedPerson : person)));
    
        ( error: any)=>console.log("hey you have an   ERROR ",error)  }
    )
    return updatedPerson;
    
  }



  deletePerson(): void {
    
    this.http.delete<number>(this.personsUrl + "/" + this.id()).subscribe(() => {
      this.Persons.set(this.Persons().filter(person => person.id !==this.id()));
      ( error: any)=>console.log("hey you have an   ERROR ",error)
    })
  }

  getById(): void {
    this.http.get<Person>(this.personsUrl + "/" + this.selectedPersonId()).subscribe((person) => {
      (this.OnePerson.set(person));
      ( error: any)=>console.log("hey you have an   ERROR ",error)
    });
  }



  id=signal(0);
  setselectedId(num:number){
    this.id.set(num)
    console.log(this.id())
  }

 /*  getById2(PersonId: number): Person {
    this.http.get<Person>(this.personsUrl + "/" + PersonId).subscribe(

      (person) => {
        (this.OnePerson.set(person))
      })
    return this.OnePerson();
  } */
  constructor() {
    this.person$.subscribe((newpeople) => {
      this.Persons.set(newpeople);
    })
  }
}
