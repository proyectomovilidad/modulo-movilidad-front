import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PaisesService } from './../../services/paises.service';
import { InstitucionCooperanteService } from './../../services/institucion-cooperante.service';
import { TipoMovilidadService } from './../../services/tipo-movilidad.service';
import { ProgramasService } from './../../services/programas.service';
import { ConveniosService } from './../../services/convenios.service';
import { TipoConvenioService } from './../../services/tipo-convenio.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-convenios',
  templateUrl: './convenios.component.html',
  styleUrls: ['./convenios.component.css']
})
export class ConveniosComponent implements OnInit {

  public paises: any;
  public institucionesCooperantes: any;
  public programas: any;
  public tiposMovilidad: any;
  public tiposConvenio: any;
  public convenios: any;

  public formularioCrearConvenio: FormGroup;
  public formularioConsultarConvenio: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public ConveniosService: ConveniosService,
    public PaisesService: PaisesService,
    public InstitucionCooperanteService: InstitucionCooperanteService,
    public ProgramasService: ProgramasService,
    public TipoMovilidadService: TipoMovilidadService,
    public TipoConvenioService: TipoConvenioService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,



  ) {
    this.formularioCrearConvenio = this.formBuilder.group({
      nombre_convenio: ['', Validators.required],
      version_convenio: ['', Validators.required],
      programa_acad: ['', Validators.required],
      promedio: [0, Validators.required],
      cred_cursados: [0, Validators.required],
      cred_cursar: [0, Validators.required],
      cupo: [0, Validators.required],
      estado_convenio: ['', Validators.required],
      fecha_inicio: [Date, Validators.required],
      fecha_final: [Date, Validators.required],
      fecha_suscripcion: [Date, Validators.required],
      tipo_convenio: ['', Validators.required],
      tipo_movilidad: ['', Validators.required],
      nombre_institucion: ['', Validators.required],
      pais: ['', Validators.required],
    });

    this.formularioConsultarConvenio = this.formBuilder.group({
      _id: [],
      tipo_movilidad: [],
      nombre_institucion: [],
      estado_convenio: []
    });

  }
  rol = environment.user.rol

  async ngOnInit(): Promise<void> {
    let user = environment.user;
    if(!this.route.snapshot.data['roles'].includes(user.rol)){
      this.router.navigateByUrl(environment.unauthorizedPage);
      this.dialog.open(CustomDialogComponent, { data: { code: 403}});
    }
    this.paises = await this.PaisesService.getPais();
    this.institucionesCooperantes = await this.InstitucionCooperanteService.getInstitucionCooperante();
    this.programas = await this.ProgramasService.getProgramaAcademico();
    this.tiposMovilidad = await this.TipoMovilidadService.getTipoMovilidad();
    this.tiposConvenio = await this.TipoConvenioService.getTipoConvenio();
    this.convenios = await this.ConveniosService.getAllConvenios();

  }

  getNoValido(input: string) {
    return this.formularioCrearConvenio.get(input).invalid &&
      this.formularioCrearConvenio.get(input).touched;
  }

  async guardarFormulario() {
    if (this.formularioCrearConvenio.invalid) {
      return Object.values(this.formularioCrearConvenio.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    const crearConvenio = this.formularioCrearConvenio.value;
    console.log(crearConvenio)

    const convenio = {

      nombre_convenio: crearConvenio.nombre_convenio,
      version_convenio: crearConvenio.version_convenio,
      programa_acad: crearConvenio.programa_acad,
      promedio: crearConvenio.promedio,
      cred_cursados: crearConvenio.cred_cursados,
      cred_cursar: crearConvenio.cred_cursar,
      cupo: crearConvenio.cupo,
      estado_convenio: crearConvenio.estado_convenio,
      fecha_inicio: crearConvenio.fecha_inicio,
      fecha_final: crearConvenio.fecha_final,
      fecha_suscripcion: crearConvenio.fecha_suscripcion,
      tipo_convenio: crearConvenio.tipo_convenio,
      tipo_movilidad: crearConvenio.tipo_movilidad,
      nombre_institucion: crearConvenio.nombre_institucion,
      pais: crearConvenio.pais,
    }

    const convenioGuardado = await this.ConveniosService.saveConvenio(convenio);
    console.log(convenioGuardado);

    this.formularioCrearConvenio.reset();

  }

  async consultarConvenio() {
    if (this.formularioConsultarConvenio.invalid) {
      return Object.values(this.formularioConsultarConvenio.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    const consultarConvenio = this.formularioConsultarConvenio.value;
    console.log(consultarConvenio)


    const consulta = {
      "convenio._id": consultarConvenio._id,
      "convenio.estado_convenio": consultarConvenio.estado_convenio,

      "TipoMovilidad._id": consultarConvenio.tipo_movilidad,
      "InstitucionCooperante._id": consultarConvenio.nombre_institucion

    }

    this.convenios = await this.ConveniosService.consultarConvenios(consulta)
    console.log("resultado", this.convenios)

  }

  limpiarFormulario() {
    this.formularioCrearConvenio.reset();
  }

  public editarConvenio(id: any) {
    this.router.navigateByUrl('/editar-convenio?_id=' + id);
  }

  public verConvenio(id: any) {
    this.router.navigateByUrl('/visualizar-convenio?_id=' + id);
  }

  async eliminarConvenio(id: any, obj: any) {
    let respuesta = await this.ConveniosService.deleteConvenio(id);
    console.log(respuesta);
    let code = 213;
    if (respuesta.status) {
      code = 214;
      this.convenios.splice(this.convenios.indexOf(obj),1)
    }
    this.dialog.open(CustomDialogComponent, { data: { code: code}});

  }
}
