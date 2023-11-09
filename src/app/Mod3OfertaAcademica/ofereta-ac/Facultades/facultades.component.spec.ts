import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OferetaACComponent } from './facultades.component';

describe('OferetaACComponent', () => {
  let component: OferetaACComponent;
  let fixture: ComponentFixture<OferetaACComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OferetaACComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OferetaACComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
