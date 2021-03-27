import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarExternoComponent } from './editar-externo.component';

describe('EditarExternoComponent', () => {
  let component: EditarExternoComponent;
  let fixture: ComponentFixture<EditarExternoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarExternoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarExternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
