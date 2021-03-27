import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternosMovilidadComponent } from './externos-movilidad.component';

describe('ExternosMovilidadComponent', () => {
  let component: ExternosMovilidadComponent;
  let fixture: ComponentFixture<ExternosMovilidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternosMovilidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternosMovilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
