import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionMenusComponent } from './administracion-menus.component';

describe('AdministracionMenusComponent', () => {
  let component: AdministracionMenusComponent;
  let fixture: ComponentFixture<AdministracionMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministracionMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
