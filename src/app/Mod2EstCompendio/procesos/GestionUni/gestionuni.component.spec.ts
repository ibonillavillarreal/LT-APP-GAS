import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionuniComponent } from './gestionuni.component';

describe('GestionuniComponent', () => {
  let component: GestionuniComponent;
  let fixture: ComponentFixture<GestionuniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionuniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionuniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
