import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosInstitucionComponent } from './datos-institucion.component';

describe('DatosInstitucionComponent', () => {
  let component: DatosInstitucionComponent;
  let fixture: ComponentFixture<DatosInstitucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosInstitucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosInstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
