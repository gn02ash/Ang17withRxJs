import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PersonService } from '../person.service';
import { Person } from '../person';
import { CommonModule } from '@angular/common';
import { PopupService } from '../popup-add/popup-add.service'
import { EditFormComponent } from '../edit-form/edit-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.css'
})
export class PersonListComponent {

  PersonService = inject(PersonService); // inject func makes it more obvi that we're injecting a dependency
  EditFormComponent = inject(EditFormComponent);
  pageTitle = 'People (only me and some weird letter combos) List';

  //Entity , Perrson Signal
  /* persons = effect(() => {
    try {
      return this.PersonService.Persons();

    } catch(e) {
      this.errorMessage=typeof e==='string'? e :'Error';
      return [];
    }
  });
  errorMessage: string; */
  persons = this.PersonService.Persons();
  //i know it's not persons it's just weird to call it people
  //persons=toSignal(this.PersonService.getProducts(), { initialValue: null });
  //selectedPersonId=this.PersonService.selectedPersonId

  OnSelected(id: number) {
    console.log("this is the selected id", id)
    // this.PersonService.setSelectedPerson(id)
  }


  constructor(private popupService: PopupService, private dialogRef: MatDialogRef<EditFormComponent>, private dialog: MatDialog) { }

  openPopup() {
    this.popupService.openPopup();

  }
  showForm(id: number) {
    this.PersonService.getById(id)
    this.dialog.open(EditFormComponent, {

      width: '450px',
      height: '300px',

    });


  }
}
