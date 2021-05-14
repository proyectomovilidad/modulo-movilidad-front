import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ObservacionesComponent } from './../observaciones/observaciones.component';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoDocumentoService } from './../../services/tipo-documento.service';
import { InscripcionEstudianteService } from '../../services/inscripcion-estudiante.service'
import { CargaDocumentoService  } from '../../services/carga-documento.service';

@Component({
  selector: 'app-revision-documentos',
  templateUrl: './revision-documentos.component.html',
  styleUrls: ['./revision-documentos.component.css']
})
export class RevisionDocumentosComponent implements OnInit {

  public documentos: any;
  public estudiante: any;// Esta variable acumula el dato de la inscripcion

  constructor(public dialog: MatDialog,
    private router: Router, private inscripcionEstudianteService: InscripcionEstudianteService,
    private cargarDocumentoService: CargaDocumentoService,
    private route: ActivatedRoute,
    private TipoDocumentoService: TipoDocumentoService
    ) { }

  openDialog() {
    this.dialog.open(ObservacionesComponent);
  }


  ngOnInit(){   
    const codigo_est = this.route.snapshot.queryParams.codigo_est
    const documento_id = this.route.snapshot.queryParams.documento_id

    if(codigo_est){
      this.inscripcionEstudianteService.getInscripcionByEstudiante('codigo_est', codigo_est).then(resp=>{
        if(resp.status){
          this.estudiante = resp.data[0];
          this.getDocumentos();
        }
      })
    }
    else if(documento_id){
      this.inscripcionEstudianteService.getInscripcionByEstudiante('documento_id', documento_id).then(resp=>{
        if(resp.status){
          this.estudiante = resp.data[0];
          this.getDocumentos();
        }
      })
    }

   
  }

  getDocumentos(){
    this.TipoDocumentoService.getDocumentoByConvenio(this.estudiante.nombre_convenio).then(resp=>{
      if(resp.status)this.documentos = resp.data;
    });
  }

  descargarDocumentoByNombre(documento){
    const nombre = `${this.estudiante._id}-${documento}.pdf`

    this.cargarDocumentoService.getDocumentosByNombre(nombre).then(resp=>{
      console.log(resp)
    })
  }

  actualizarEstadoInscripcion(){
    this.inscripcionEstudianteService.updateInscripcionStatus({estado: 3}, this.estudiante._id).then(resp=>{
      console.log(resp)
    })
  }

}