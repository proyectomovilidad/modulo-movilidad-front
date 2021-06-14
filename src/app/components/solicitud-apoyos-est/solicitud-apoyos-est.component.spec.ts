import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudApoyosEstComponent } from './solicitud-apoyos-est.component';

describe('SolicitudApoyosEstComponent', () => {
  let component: SolicitudApoyosEstComponent;
  let fixture: ComponentFixture<SolicitudApoyosEstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudApoyosEstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudApoyosEstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
