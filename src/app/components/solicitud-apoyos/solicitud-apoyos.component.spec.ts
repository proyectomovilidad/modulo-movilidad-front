import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudApoyosComponent } from './solicitud-apoyos.component';

describe('SolicitudApoyosComponent', () => {
  let component: SolicitudApoyosComponent;
  let fixture: ComponentFixture<SolicitudApoyosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudApoyosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudApoyosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
