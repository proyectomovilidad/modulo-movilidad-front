import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesMovilidadComponent } from './estudiantes-movilidad.component';

describe('EstudiantesMovilidadComponent', () => {
  let component: EstudiantesMovilidadComponent;
  let fixture: ComponentFixture<EstudiantesMovilidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudiantesMovilidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiantesMovilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
