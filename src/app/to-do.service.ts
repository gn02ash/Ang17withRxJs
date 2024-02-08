import { HttpClient } from '@angular/common/http';
import { PersonService } from './person.service';
import { Injectable, inject, effect, signal } from '@angular/core';
import { ToDo } from './to-do';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, switchMap, of, Observable } from 'rxjs';
import { debug } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  http = inject(HttpClient);
  PersonService = inject(PersonService);
  todoUrl = "http://localhost:5049/api/Person/";
  //get the person info
 
  /* DetailsEffect = effect(() => {
    this.http.get<ToDo[]>(this.todoUrl + "9").subscribe(
      async details => await this.personDetails.set(details));
  }, { allowSignalWrites: true },

  ) */
  //declare a signal

// declare an Observable to get the data from backend 
//num=this.PersonService.selectedPersonId();
num=0;
//private details$=  toObservable<ToDo[]>;
personDetails$ = new Observable<ToDo[]>();
selectedId = signal(0);
d5ebug=effect(()=>{
 // console.log("selectedId",this.PersonService.selectedPersonId());
  this.personDetails$=(this.http.get<ToDo[]>(this.todoUrl+this.num))
});
persondetails = toSignal(this.personDetails$,{initialValue:[]as ToDo[]})
  //do a change 
  changeName(name: ToDo) {
    //do something here
  }
  persondetailsd=effect(()=>{
    console.log("details2", this.persondetails())
  })
  constructor() {
    console.log("details2", this.persondetailsd,"details2",this.d5ebug)
  }
}
