import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PersonListComponent } from './person-list/person-list.component';

import { EditFormComponent } from './edit-form/edit-form.component';
import { PopupService } from   './popup-add/popup-add.service'
import { NgModule }      from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PersonListComponent,EditFormComponent,   HttpClientModule, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Ang_PW2_Front';
  
}
