
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailActaComponent } from './detail-Acta.component';

describe('DetailActaComponent', () => {
  let component: DetailActaComponent;
  let fixture: ComponentFixture<DetailActaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailActaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailActaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
