import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActaComponent } from './list-acta.component';

describe('ListFacturaComponent', () => {
  let component: ListActaComponent;
  let fixture: ComponentFixture<ListActaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListActaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListActaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
