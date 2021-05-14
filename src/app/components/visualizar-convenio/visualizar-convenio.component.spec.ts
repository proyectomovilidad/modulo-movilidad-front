import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarConvenioComponent } from './visualizar-convenio.component';

describe('VisualizarConvenioComponent', () => {
  let component: VisualizarConvenioComponent;
  let fixture: ComponentFixture<VisualizarConvenioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarConvenioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarConvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
