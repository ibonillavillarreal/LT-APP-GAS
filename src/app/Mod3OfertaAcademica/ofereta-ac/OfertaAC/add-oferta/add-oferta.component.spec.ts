import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOfertaComponent } from './add-oferta.component';

describe('AddOfertaComponent', () => {
  let component: AddOfertaComponent;
  let fixture: ComponentFixture<AddOfertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOfertaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
