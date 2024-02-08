import { Component, OnInit, inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PersonService } from '../person.service';

@Component({
  selector: 'app-confirm-delete',
  standalone: true,
  imports:  [FormsModule, ReactiveFormsModule],
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.css'
})
export class ConfirmDeleteComponent {
  PersonService = inject(PersonService);

  editForm: FormGroup;
  OnCancel(): void {
    this.dialogRef.close();
  }
  constructor( private dialogRef: MatDialogRef<ConfirmDeleteComponent>, private dialog: MatDialog) {
   
  }

  OnConfirm(): void {
    this.dialogRef.close();
    this.PersonService.deletePerson();
    location.reload();
  }
}
