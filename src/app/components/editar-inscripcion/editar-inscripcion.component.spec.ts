import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInscripcionComponent } from './editar-inscripcion.component';

describe('EditarInscripcionComponent', () => {
  let component: EditarInscripcionComponent;
  let fixture: ComponentFixture<EditarInscripcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarInscripcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
