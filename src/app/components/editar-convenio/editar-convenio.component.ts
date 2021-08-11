import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PaisesService } from './../../services/paises.service';
import { InstitucionCooperanteService } from './../../services/institucion-cooperante.service';
import { TipoMovilidadService } from './../../services/tipo-movilidad.service';
import { ProgramasService } from './../../services/programas.service';
import { ConveniosService } from './../../services/convenios.service';
import { TipoConvenioService } from './../../services/tipo-convenio.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {environment} from '../../../environments/environment';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';


@Component({
  selector: 'app-editar-convenio',
  templateUrl: './editar-convenio.component.html',
  styleUrls: ['./editar-convenio.component.css']
})
export class EditarConvenioComponent implements OnInit {

  public paises: any;
  public institucionesCooperantes: any;
  public programas: any;
  public tiposMovilidad: any;
  public tiposConvenio: any;
  public convenios: any;
  public convenioElegido: any;
  public inscritos: any;

  public formularioEditarConvenio: FormGroup;


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
    this.formularioEditarConvenio = this.formBuilder.group({
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
  }

  async ngOnInit(): Promise<void> {
    const user = environment.user;

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

    const id = this.route.snapshot.queryParams._id
    this.inscritos = await this.ConveniosService.getConvenio(id);


    if (this.inscritos[0]) {
      const convenio = this.inscritos[0];
      this.convenioElegido = convenio;

      this.formularioEditarConvenio.controls.nombre_convenio.setValue(convenio.nombre_convenio);
      this.formularioEditarConvenio.controls.version_convenio.setValue(convenio.version_convenio);
      this.formularioEditarConvenio.controls.programa_acad.setValue(convenio.programa_acad);
      this.formularioEditarConvenio.controls.promedio.setValue(convenio.promedio);
      this.formularioEditarConvenio.controls.cred_cursados.setValue(convenio.cred_cursados);
      this.formularioEditarConvenio.controls.cred_cursar.setValue(convenio.cred_cursar);
      this.formularioEditarConvenio.controls.cupo.setValue(convenio.cupo);
      this.formularioEditarConvenio.controls.estado_convenio.setValue(convenio.estado_convenio);
      this.formularioEditarConvenio.controls.fecha_inicio.setValue(convenio.fecha_inicio);
      this.formularioEditarConvenio.controls.fecha_final.setValue(convenio.fecha_final);
      this.formularioEditarConvenio.controls.fecha_suscripcion.setValue(convenio.fecha_suscripcion);
      this.formularioEditarConvenio.controls.tipo_convenio.setValue(convenio.tipo_convenio);
      this.formularioEditarConvenio.controls.tipo_movilidad.setValue(convenio.tipo_movilidad);
      this.formularioEditarConvenio.controls.nombre_institucion.setValue(convenio.nombre_institucion);
      this.formularioEditarConvenio.controls.pais.setValue(convenio.pais);
    }
  }

  getNoValido(input: string) {
    return this.formularioEditarConvenio.get(input).invalid &&
      this.formularioEditarConvenio.get(input).touched;
  }

  async guardarFormulario() {
    if (this.formularioEditarConvenio.invalid) {
      return Object.values(this.formularioEditarConvenio.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    const editarConvenio = this.formularioEditarConvenio.value;
    console.log(editarConvenio)

    const convenio = {
      nombre_convenio: editarConvenio.nombre_convenio,
      version_convenio: editarConvenio.version_convenio,
      programa_acad: editarConvenio.programa_acad,
      promedio: editarConvenio.promedio,
      cred_cursados: editarConvenio.cred_cursados,
      cred_cursar: editarConvenio.cred_cursar,
      cupo: editarConvenio.cupo,
      estado_convenio: editarConvenio.estado_convenio,
      fecha_inicio: editarConvenio.fecha_inicio,
      fecha_final: editarConvenio.fecha_final,
      fecha_suscripcion: editarConvenio.fecha_suscripcion,
      tipo_convenio: editarConvenio.tipo_convenio,
      tipo_movilidad: editarConvenio.tipo_movilidad,
      nombre_institucion: editarConvenio.nombre_institucion,
      pais: editarConvenio.pais
    }

    const convenioEditado = await this.ConveniosService.updateConvenio(convenio, this.convenioElegido._id);
    console.log(convenioEditado);
    let code = convenioEditado._id ? 212 : 211;
    this.dialog.open(CustomDialogComponent, { data: { code: code}});
  }

  public cancelarEdicion() {
    this.router.navigateByUrl('/convenios');
  }
}
