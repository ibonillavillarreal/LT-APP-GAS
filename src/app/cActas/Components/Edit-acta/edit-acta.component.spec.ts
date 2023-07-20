import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActaComponent } from './edit-acata.component';

describe('EditFacturaComponent', () => {
  let component: EditActaComponent;
  let fixture: ComponentFixture<EditActaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditActaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditActaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
