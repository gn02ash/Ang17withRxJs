import { Component, Injectable, Input, OnInit, effect, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PersonService } from '../person.service';
import { Person } from '../person';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'

@Component({
  selector: 'app-popup-add',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './popup-add.component.html',
  styleUrl: './popup-add.component.css'
})

@Injectable({
  providedIn: 'root'
})
export class PopupAddComponent  implements OnInit{
  editForm: FormGroup;
 
  PersonService = inject(PersonService);
  @Input() person:Person;
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.editForm=new FormGroup({
      id:new FormControl(),
      name: new FormControl(),
      age: new FormControl()
  });

  }
  constructor(private fb: FormBuilder,private dialogRef: MatDialogRef<PopupAddComponent>, private personService: PersonService,private dialog: MatDialog) {
   
  }


  OnSubmit():void
  {
    const updatedPerson: Person = {
      id:0,
      name: this.editForm.value.name,
      age: this.editForm.value.age,
    };
    this.personService.addPerson(updatedPerson);
   console.log(updatedPerson);
   this.dialogRef.close();
   location.reload();
    
  }
  OnCancel():void
  {
    this.dialogRef.close();
  }
  
}

  

