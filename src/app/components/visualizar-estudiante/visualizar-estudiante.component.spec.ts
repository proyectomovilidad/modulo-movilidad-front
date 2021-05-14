import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarEstudianteComponent } from './visualizar-estudiante.component';

describe('VisualizarEstudianteComponent', () => {
  let component: VisualizarEstudianteComponent;
  let fixture: ComponentFixture<VisualizarEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
