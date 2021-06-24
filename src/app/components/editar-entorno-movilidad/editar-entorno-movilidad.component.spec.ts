import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEntornoMovilidadComponent } from './editar-entorno-movilidad.component';

describe('EditarEntornoMovilidadComponent', () => {
  let component: EditarEntornoMovilidadComponent;
  let fixture: ComponentFixture<EditarEntornoMovilidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarEntornoMovilidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEntornoMovilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
