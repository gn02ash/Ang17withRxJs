import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupAddComponent } from './popup-add.component';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor(private dialog: MatDialog) {}

  openPopup() {
    this.dialog.open(PopupAddComponent, {
      
      width: '450px',
      height: '250px',
      
    });
  }
}