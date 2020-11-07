import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudApoyosRelextComponent } from './solicitud-apoyos-relext.component';

describe('SolicitudApoyosRelextComponent', () => {
  let component: SolicitudApoyosRelextComponent;
  let fixture: ComponentFixture<SolicitudApoyosRelextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudApoyosRelextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudApoyosRelextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
