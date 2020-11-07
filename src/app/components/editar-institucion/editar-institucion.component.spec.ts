import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInstitucionComponent } from './editar-institucion.component';

describe('EditarInstitucionComponent', () => {
  let component: EditarInstitucionComponent;
  let fixture: ComponentFixture<EditarInstitucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarInstitucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarInstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
