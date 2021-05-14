import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoDocumentoService } from './../../services/tipo-documento.service';
import { TipoMovilidadService } from './../../services/tipo-movilidad.service';
import { InstitucionCooperanteService } from './../../services/institucion-cooperante.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InscripcionEstudianteService } from './../../services/inscripcion-estudiante.service';
import { InscripcionExternoService } from './../../services/inscripcion-externo.service';

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
  public externos: any;
  public documentos: any;
  public formularioConsultarEstudiante: FormGroup;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private TipoDocumentoService: TipoDocumentoService,
    private InscripcionEstudianteService: InscripcionEstudianteService,
    private InscripcionExternoService: InscripcionExternoService,
    private inscripcionEstudianteService: InscripcionEstudianteService
  ) {
    this.formularioConsultarEstudiante = this.formBuilder.group({
      codigo_est: [],

    });

  }

  ngOnInit(){
    this.InscripcionEstudianteService.getAllAspUisPersonal().then(resp=>{      
      if(resp.status) this.estudiantes = resp.data;
    });

    this.InscripcionExternoService.getAllAspExternoPersonal().then(resp=>{      
      this.externos = resp
    });
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

    const consulta = {
      "aspUisPersonal.codigo_est": consultarEstudiante.codigo_est
    }
    console.log("resultado", consulta)
    this.estudiantes = await this.inscripcionEstudianteService.consultarEstudiantes(consulta)
    console.log("resultado", this.estudiantes)

  }

}
