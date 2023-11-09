import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIesComponent } from './add-ies.component';

describe('AddIesComponent', () => {
  let component: AddIesComponent;
  let fixture: ComponentFixture<AddIesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
