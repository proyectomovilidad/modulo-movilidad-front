import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTipoApoyoComponent } from './editar-tipo-apoyo.component';

describe('EditarTipoApoyoComponent', () => {
  let component: EditarTipoApoyoComponent;
  let fixture: ComponentFixture<EditarTipoApoyoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarTipoApoyoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTipoApoyoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
