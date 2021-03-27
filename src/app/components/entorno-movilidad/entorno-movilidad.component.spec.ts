import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntornoMovilidadComponent } from './entorno-movilidad.component';

describe('EntornoMovilidadComponent', () => {
  let component: EntornoMovilidadComponent;
  let fixture: ComponentFixture<EntornoMovilidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntornoMovilidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntornoMovilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
