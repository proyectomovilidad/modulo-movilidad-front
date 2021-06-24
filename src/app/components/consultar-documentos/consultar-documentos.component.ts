import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { TipoDocumentoService } from './../../services/tipo-documento.service';
import { TipoMovilidadService } from './../../services/tipo-movilidad.service';
import { InstitucionCooperanteService } from './../../services/institucion-cooperante.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InscripcionEstudianteService } from './../../services/inscripcion-estudiante.service';
import { InscripcionExternoService } from './../../services/inscripcion-externo.service';
import {environment} from '../../../environments/environment';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-consultar-documentos',
  templateUrl: './consultar-documentos.component.html',
  styleUrls: ['./consultar-documentos.component.css']
})
export class ConsultarDocumentosComponent implements OnInit {

  public tiposMovilidad: any;
  public instituciones: any;
  public formularioDocumentos: FormGroup;
  public estudiantes: any;
  public externos: any = [];
  public documentos: any;
  public formularioConsultarEstudiante: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private TipoDocumentoService: TipoDocumentoService,
              private InscripcionEstudianteService: InscripcionEstudianteService,
              private dialog: MatDialog,
              private InscripcionExternoService: InscripcionExternoService,
              private inscripcionEstudianteService: InscripcionEstudianteService
  ) {
    this.formularioConsultarEstudiante = this.formBuilder.group({
      codigo_est: [],
      documento_id: []
    });

  }



  ngOnInit(){
    let user = environment.user;
    if(!this.route.snapshot.data['roles'].includes(user.rol)){
      this.router.navigateByUrl(environment.unauthorizedPage);
      this.dialog.open(CustomDialogComponent, { data: { code: 403}});
    }
    this.obtener_datos();
  }

  public revisarDocumentoUis(codigo_est: any) {
    this.router.navigateByUrl('/revision-documentos?codigo_est=' + codigo_est);
  }

  public revisarDocumentoExt(documento_id: any) {
    this.router.navigateByUrl('/revision-documentos?documento_id=' + documento_id);
  }

  limpiarFormulario() {
    this.formularioConsultarEstudiante.reset();
  }

  async consultarEstudiante() {
    if (this.formularioConsultarEstudiante.invalid) {
      return Object.values(this.formularioConsultarEstudiante.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    const consultarEstudiante = this.formularioConsultarEstudiante.value;

    if (consultarEstudiante.codigo_est) {
      const consulta = {
        "aspUisPersonal.codigo_est": consultarEstudiante.codigo_est
      }

      this.externos = [];
      this.inscripcionEstudianteService.consultarEstudiantes(consulta).then( resp => {
        if( !resp.status ) {
          this.estudiantes = resp
        }
      } )
    }

    if (consultarEstudiante.documento_id ) {
      let consulta = {
        "aspExtPersonal.documento_id": consultarEstudiante.documento_id
      }
      this.estudiantes = [];

      console.log('aca: ', this.externos)
      this.externos = await this.InscripcionExternoService.consultarExternos(consulta);
    }

  }

  public cancelarConsulta() {
    this.limpiarFormulario();
    this.obtener_datos();
  }

  private obtener_datos() {
    this.InscripcionEstudianteService.getAllAspUisPersonal().then(resp=>{
      if(resp.status) this.estudiantes = resp.data;
    });

    this.InscripcionExternoService.getAllAspExternoPersonal().then(resp=>{
      this.externos = resp
    });
  }

}
