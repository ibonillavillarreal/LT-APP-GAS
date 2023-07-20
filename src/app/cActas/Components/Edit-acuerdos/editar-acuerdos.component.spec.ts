import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAcuerdosComponent } from './editar-acuerdos.component';

describe('EditarCantidadComponent', () => {
  let component: EditarAcuerdosComponent;
  let fixture: ComponentFixture<EditarAcuerdosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarAcuerdosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAcuerdosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
