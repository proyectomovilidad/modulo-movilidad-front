import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarProfesorComponent } from './visualizar-profesor.component';

describe('VisualizarProfesorComponent', () => {
  let component: VisualizarProfesorComponent;
  let fixture: ComponentFixture<VisualizarProfesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarProfesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
