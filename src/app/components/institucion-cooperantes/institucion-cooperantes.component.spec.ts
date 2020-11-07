import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitucionCooperantesComponent } from './institucion-cooperantes.component';

describe('InstitucionCooperantesComponent', () => {
  let component: InstitucionCooperantesComponent;
  let fixture: ComponentFixture<InstitucionCooperantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitucionCooperantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitucionCooperantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
