import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtencionComponent } from './extencion.component';

describe('ExtencionComponent', () => {
  let component: ExtencionComponent;
  let fixture: ComponentFixture<ExtencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtencionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
