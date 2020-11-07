import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionEstudianteComponent } from './inscripcion-estudiante.component';

describe('InscripcionEstudianteComponent', () => {
  let component: InscripcionEstudianteComponent;
  let fixture: ComponentFixture<InscripcionEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscripcionEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscripcionEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
