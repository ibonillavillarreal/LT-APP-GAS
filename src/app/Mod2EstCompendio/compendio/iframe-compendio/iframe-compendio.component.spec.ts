import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IframeCompendioComponent } from './iframe-compendio.component';

describe('IframeCompendioComponent', () => {
  let component: IframeCompendioComponent;
  let fixture: ComponentFixture<IframeCompendioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IframeCompendioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IframeCompendioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
