import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesoresModuloComponent } from './profesores-modulo.component';

describe('ProfesoresModuloComponent', () => {
  let component: ProfesoresModuloComponent;
  let fixture: ComponentFixture<ProfesoresModuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesoresModuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesoresModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
