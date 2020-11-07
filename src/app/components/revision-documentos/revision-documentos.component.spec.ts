import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionDocumentosComponent } from './revision-documentos.component';

describe('RevisionDocumentosComponent', () => {
  let component: RevisionDocumentosComponent;
  let fixture: ComponentFixture<RevisionDocumentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisionDocumentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
