import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoApoyoComponent } from './tipo-apoyo.component';

describe('TipoApoyoComponent', () => {
  let component: TipoApoyoComponent;
  let fixture: ComponentFixture<TipoApoyoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoApoyoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoApoyoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
