import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompendioComponent } from './compendio.component';

describe('CompendioComponent', () => {
  let component: CompendioComponent;
  let fixture: ComponentFixture<CompendioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompendioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompendioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
