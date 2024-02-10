import { Component, Injectable, Input, OnInit, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

    this.editForm = this.fb.group({
      id: [0],
      name: [null, [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
      age: [null, [Validators.required, Validators.min(16), Validators.max(150)]],

    });

  }
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<PopupAddComponent>, private personService: PersonService, private dialog: MatDialog) {
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

    if (this.editForm.valid) {
      const updatedPerson: Person = {
        id: 0,
        name: this.editForm.value.name,
        age: this.editForm.value.age,
      };

      this.personService.addPerson(updatedPerson);
      this.personService.showNameError.set(false);
      this.personService.showAgeError.set(false);

      this.dialogRef.close();
    }
  }

  OnCancel(): void {
    this.dialogRef.close();
  }

}



