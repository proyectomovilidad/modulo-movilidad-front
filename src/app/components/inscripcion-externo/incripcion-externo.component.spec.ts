import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncripcionExternoComponent } from './incripcion-externo.component';

describe('IncripcionExternoComponent', () => {
  let component: IncripcionExternoComponent;
  let fixture: ComponentFixture<IncripcionExternoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncripcionExternoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncripcionExternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
