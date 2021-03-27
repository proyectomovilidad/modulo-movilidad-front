import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ObservacionesComponent } from './../observaciones/observaciones.component';
import { Router } from '@angular/router';
import { TipoDocumentoService } from './../../services/tipo-documento.service';

 
@Component({
  selector: 'app-revision-documentos',
  templateUrl: './revision-documentos.component.html',
  styleUrls: ['./revision-documentos.component.css']
})
export class RevisionDocumentosComponent implements OnInit {

  public documentos: any;

  constructor(public dialog: MatDialog,
    private router: Router,
    private TipoDocumentoService: TipoDocumentoService
    ) { }

  openDialog() {
    this.dialog.open(ObservacionesComponent);
  }


  async ngOnInit(): Promise<void> {
    this.documentos = await this.TipoDocumentoService.getDocumento();
  }

}


