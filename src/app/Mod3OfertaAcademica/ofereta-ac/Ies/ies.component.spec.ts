import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IesComponent } from './ies.component';

describe('IesComponent', () => {
  let component: IesComponent;
  let fixture: ComponentFixture<IesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
