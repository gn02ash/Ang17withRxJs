import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Person } from './../person';
import { Component, Injectable, Input, OnInit, WritableSignal, computed, effect, inject, signal } from '@angular/core';
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
  onePerson = computed(() => this.PersonService.OnePerson())
  ngOnInit(): void {}
  constructor(private dialogRef: MatDialogRef<EditFormComponent>, private personService: PersonService) {
    this.editForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      age: new FormControl()
    });
    effect(() => {
      this.PersonService.OnePerson()
      this.editForm = new FormGroup({
        id: new FormControl( this.onePerson().id),
        name: new FormControl(this.onePerson().name),
        age: new FormControl(this.onePerson().age)
      });
    })
  }


  OnSubmit(): void {
    const updatedPerson: Person = {
      id: this.onePerson().id,
      name: this.editForm.value.name,
      age: this.editForm.value.age,
    };
    this.personService.updatePerson(updatedPerson);
    this.dialogRef.close();
  }
  OnCancel(): void {
    this.dialogRef.close();
  }







}

