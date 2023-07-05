import { ComponentFixture, TestBed } from '@angular/core/testing';

import { addfilesComponent } from './addfiles.component';

describe('SeguirTrackComponent', () => {
  let component: addfilesComponent;
  let fixture: ComponentFixture<addfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ addfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(addfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
