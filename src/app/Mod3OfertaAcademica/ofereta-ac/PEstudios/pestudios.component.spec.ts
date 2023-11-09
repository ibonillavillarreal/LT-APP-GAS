import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PEstudiosComponent } from './pestudios.component';

describe('PEstudiosComponent', () => {
  let component: PEstudiosComponent;
  let fixture: ComponentFixture<PEstudiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PEstudiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PEstudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
