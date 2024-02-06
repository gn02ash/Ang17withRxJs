import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonToDoComponent } from './person-to-do.component';

describe('PersonToDoComponent', () => {
  let component: PersonToDoComponent;
  let fixture: ComponentFixture<PersonToDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonToDoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
