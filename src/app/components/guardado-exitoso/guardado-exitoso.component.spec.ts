import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardadoExitosoComponent } from './guardado-exitoso.component';

describe('GuardadoExitosoComponent', () => {
  let component: GuardadoExitosoComponent;
  let fixture: ComponentFixture<GuardadoExitosoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuardadoExitosoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardadoExitosoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
