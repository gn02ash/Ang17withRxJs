import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Person } from './../person';
import { Component, Injectable, Input, OnInit, WritableSignal, effect, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { NgModel } from '@angular/forms';
import { PersonService } from '../person.service';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-edit-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.css'
})
@Injectable({
  providedIn: 'root'
})
export class EditFormComponent implements OnInit {
  editForm: FormGroup;

  PersonService = inject(PersonService);
  OnePerson = this.PersonService.OnePerson();
  ngOnInit(): void {
    this.editForm = new FormGroup({
      id: new FormControl(this.OnePerson.id),
      name: new FormControl(this.OnePerson.name),
      age: new FormControl(this.OnePerson.age)

    });
  
  }
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<EditFormComponent>, private personService: PersonService, private dialog: MatDialog) {
   
  }


  OnSubmit(): void {
    const updatedPerson: Person = {
      id: this.OnePerson.id,
      name: this.editForm.value.name,
      age: this.editForm.value.age,
    };
    this.personService.updatePerson(updatedPerson);
    console.log(updatedPerson);
    this.dialogRef.close();
  }
  OnCancel(): void {
    this.dialogRef.close();
  }







}

