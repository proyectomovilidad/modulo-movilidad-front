import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarDocumentosComponent } from './consultar-documentos.component';

describe('ConsultarDocumentosComponent', () => {
  let component: ConsultarDocumentosComponent;
  let fixture: ComponentFixture<ConsultarDocumentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarDocumentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
