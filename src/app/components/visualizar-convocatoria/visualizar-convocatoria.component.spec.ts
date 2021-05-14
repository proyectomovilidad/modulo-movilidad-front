import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarConvocatoriaComponent } from './visualizar-convocatoria.component';

describe('VisualizarConvocatoriaComponent', () => {
  let component: VisualizarConvocatoriaComponent;
  let fixture: ComponentFixture<VisualizarConvocatoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarConvocatoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarConvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
