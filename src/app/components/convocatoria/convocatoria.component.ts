import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { InstitucionCooperanteService } from './../../services/institucion-cooperante.service';
import { ConvocatoriaService } from './../../services/convocatoria.service';
import { TipoProyectoService } from './../../services/tipo-proyecto.service';
import {MatDialog} from '@angular/material/dialog';
import {environment} from '../../../environments/environment';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-convocatoria',
  templateUrl: './convocatoria.component.html',
  styleUrls: ['./convocatoria.component.css']
})
export class ConvocatoriaComponent implements OnInit {

  public institucionesCooperantes: any;
  public tiposProyecto: any;
  public convocatorias: any;
  public formularioCrearConvocatoria: FormGroup;
  public formConsulta: FormGroup;



  constructor(private formBuilder: FormBuilder,
              public InstitucionCooperanteService: InstitucionCooperanteService,
              public ConvocatoriaService: ConvocatoriaService,
              public TipoProyectoService: TipoProyectoService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,

  ) {
    this.formularioCrearConvocatoria = this.formBuilder.group({
      nombre_convocatoria: ['', Validators.required],
      estado_convocatoria: ['', Validators.required],
      periodo_convocatoria: ['', Validators.required],
      fecha_inicio: [Date, Validators.required],
      fecha_final: [Date, Validators.required],
      fecha_suscripcion: [Date, Validators.required],
      nombre_institucion: ['', Validators.required],
      tipo_proyecto: ['', Validators.required],
      link_inscripcion: ['', Validators.required],
    });

    this.formConsulta = this.formBuilder.group({
      _id: [''],
      nombre_institucion: [''],
      estado: [''],
      tipo_proyecto: ['']
    });
  }

  async ngOnInit(): Promise<void> {
    const user = environment.user;

    if( !this.route.snapshot.data['roles'].includes(user.role)){
     // this.router.navigateByUrl(environment.unauthorizedPage);
      this.dialog.open(CustomDialogComponent, { data: { code: 403}});
    }

    this.institucionesCooperantes = await this.InstitucionCooperanteService.getInstitucionCooperante();
    this.tiposProyecto = await this.TipoProyectoService.getTiposProyecto();
    await this.getConvocatorias();
  }

  getNoValido(input: string) {
    return this.formularioCrearConvocatoria.get(input).invalid &&
      this.formularioCrearConvocatoria.get(input).touched;
  }

  async guardarFormulario() {
    if (this.formularioCrearConvocatoria.invalid) {
      return Object.values(this.formularioCrearConvocatoria.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    const crearConvocatoria = this.formularioCrearConvocatoria.value;
    console.log(crearConvocatoria)

    const convocatoria = {

      nombre_convocatoria: crearConvocatoria.nombre_convocatoria,
      estado_convocatoria: crearConvocatoria.estado_convocatoria,
      periodo_convocatoria: crearConvocatoria.periodo_convocatoria,
      fecha_inicio: crearConvocatoria.fecha_inicio,
      fecha_final: crearConvocatoria.fecha_final,
      fecha_suscripcion: crearConvocatoria.fecha_suscripcion,
      nombre_institucion: crearConvocatoria.nombre_institucion,
      tipo_proyecto: crearConvocatoria.tipo_proyecto,
      link_inscripcion: crearConvocatoria.link_inscripcion,
    }
    const convocatoriaGuardada = await this.ConvocatoriaService.saveConvocatoria(convocatoria);
    console.log(convocatoriaGuardada);

    let code = convocatoriaGuardada._id ? 201 : 210;
    this.dialog.open(CustomDialogComponent, { data: { code: code}});
    await this.getConvocatorias();
    this.formularioCrearConvocatoria.reset();
  }

  async eliminarConvocatoria(id: any, obj: any) {
    let respuesta = await this.ConvocatoriaService.deleteConvocatoria(id);
    let code = 213;

    if (respuesta.status === true) {
      this.convocatorias.splice(this.convocatorias.indexOf(obj), 1);
      code = 214;
    }
    this.dialog.open(CustomDialogComponent, { data: { code: code}});
  }

  getConsulta(): void {
    const formConsulta:any = this.formConsulta.value;

    const consulta = {
      "convocatoria._id": formConsulta._id,
      "convocatoria.nombre_institucion": formConsulta.nombre_institucion,
      "convocatoria.estado_convocatoria": formConsulta.estado,
      "convocatoria.tipo_proyecto": formConsulta.tipo_proyecto
    }

    this.ConvocatoriaService.consultarConvocatorias(consulta).then(resp => {
      if (resp.status === true) {
        this.convocatorias = resp.data;
      }
    });
  }

  getInstitucion(id) {
    return this.institucionesCooperantes.find(x => x._id == id) || {}
  }

  visualizar(id) {
    this.router.navigateByUrl('/visualizar-convocatoria?_id=' + id);
  }

  private async getConvocatorias() {
    this.ConvocatoriaService.consultarConvocatorias({}).then(resp => {
      if (resp.status === true) {
        this.convocatorias = resp.data;
      }
    });
  }

  editar(_id: any) {
    this.router.navigateByUrl('/editar-convocatoria?_id=' + _id);
  }

  cancelarConsulta() {
    this.formConsulta.reset();
    this.ConvocatoriaService.consultarConvocatorias({}).then(resp => {
      if (resp.status === true) {
        this.convocatorias = resp.data;
      }
    });
  }
}

