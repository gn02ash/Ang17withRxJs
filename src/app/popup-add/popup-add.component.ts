import { Component, Injectable, Input, OnInit, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PersonService } from '../person.service';
import { Person } from '../person';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-popup-add',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './popup-add.component.html',
  styleUrl: './popup-add.component.css'
})

@Injectable({
  providedIn: 'root'
})
export class PopupAddComponent implements OnInit {
  editForm: FormGroup;
  PersonService = inject(PersonService);
  showNameError = computed(() => this.PersonService.showNameError())
  showAgeError = computed(() => this.PersonService.showAgeError())
  public NameErrorMessage = computed(() => this.PersonService.NameErrorMessage());
  public AgeErrorMessage = computed(() => this.PersonService.AgeErrorMessage());
  @Input() person: Person;
  ngOnInit(): void {

    this.editForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      age: new FormControl(),

    });

  }
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<PopupAddComponent>, private personService: PersonService, private dialog: MatDialog) {

  }

  OnSubmit(): void {
    const updatedPerson: Person = {
      id: 0,
      name: this.editForm.value.name,
      age: this.editForm.value.age,
    };
    
    this.personService.addPerson(updatedPerson);
    this.personService.showNameError.set(false);
    this.personService.showAgeError.set(false);
    if (!this.showAgeError && !this.showNameError) {
      this.dialogRef.close();
    }
}

  OnCancel(): void {
    this.dialogRef.close();
  }

}



