import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PersonService } from '../person.service';
import { Person } from '../person';
import { CommonModule } from '@angular/common';
import { PopupService } from '../popup-add/popup-add.service'
import { EditFormComponent } from '../edit-form/edit-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

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


  persons = computed(() =>
    this.PersonService.Persons()
  )
  constructor(private popupService: PopupService, private dialog: MatDialog) {
   
    effect(() => {
      this.PersonService.OnePerson();
      this.dialog.open(EditFormComponent, {
        width: '450px',
        height: '300px',
      });
    })
  }

  openPopup() {
    this.popupService.openPopup();

  }
  showForm(id: number) {
    this.PersonService.setselectedId(id);
   
  }
  Delete(id: number) {
    this.dialog.open(ConfirmDeleteComponent, {
      width: '400px',
      height: '130px',
    });
    this.PersonService.setselectedId(id);
  }
}
