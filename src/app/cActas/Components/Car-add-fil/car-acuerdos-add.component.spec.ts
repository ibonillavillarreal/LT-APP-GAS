import { ComponentFixture, TestBed } from '@angular/core/testing';

import { carAcuerdosAddComponent } from './car-acuerdos-add.component';

describe('CarPagosAddComponent', () => {
  let component: carAcuerdosAddComponent;
  let fixture: ComponentFixture<carAcuerdosAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ carAcuerdosAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(carAcuerdosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
