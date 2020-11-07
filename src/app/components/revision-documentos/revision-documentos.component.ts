import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ObservacionesComponent } from './../observaciones/observaciones.component';

@Component({
  selector: 'app-revision-documentos',
  templateUrl: './revision-documentos.component.html',
  styleUrls: ['./revision-documentos.component.css']
})
export class RevisionDocumentosComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(ObservacionesComponent);
  }


  ngOnInit(): void {
  }

}


