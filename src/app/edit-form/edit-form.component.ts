import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  ngOnInit(): void { this.editForm = this.fb.group({
    id: [],
    name: [[Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
    age: [[Validators.required, Validators.min(16), Validators.max(150)]],

  });}
  constructor(private fb: FormBuilder,private dialogRef: MatDialogRef<EditFormComponent>, private personService: PersonService) {
   
    effect(() => {
      this.PersonService.OnePerson()
      this.editForm = this.fb.group({
        id: [this.onePerson().id],
        name: [this.onePerson().name,[Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
        age: [this.onePerson().age,[Validators.required, Validators.min(16), Validators.max(150)]]
      
      });
    })
  }
  getErrorMessage(controlName: string): string {
    const control = this.editForm.get(controlName);

    if (control) {
      if (control.hasError('required')) {
        console.log("giii");
        return 'This field is required.';
      }
      else if (control.hasError('pattern')) {
        return 'Name must be a valid string.';
      }
      else if (control.hasError('min')) {
        return 'Age cant be less than 16 years Old.';

      } else if (control.hasError('max')) {
        return ' Age cant be older than 150 years Old (you are not a Vampire ISTG!).';

      }
    }

    return '';
  }

  OnSubmit(): void {
   if(this.editForm.valid){ const updatedPerson: Person = {
      id: this.onePerson().id,
      name: this.editForm.value.name,
      age: this.editForm.value.age,
    };
    this.personService.updatePerson(updatedPerson);
    this.dialogRef.close();}
  }
  OnCancel(): void {
    this.dialogRef.close();
  }







}

