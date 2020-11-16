import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PaisesService } from './../../services/paises.service';
import { InstitucionCooperanteService } from './../../services/institucion-cooperante.service';
import { TipoMovilidadService } from './../../services/tipo-movilidad.service';
import { ProgramasService } from './../../services/programas.service';
import { ConveniosService } from './../../services/convenios.service';
import { TipoConvenioService } from './../../services/tipo-convenio.service';


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


  public formularioCrearConvenio: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public ConveniosService: ConveniosService,
    public PaisesService: PaisesService,
    public InstitucionCooperanteService: InstitucionCooperanteService,
    public ProgramasService: ProgramasService,
    public TipoMovilidadService: TipoMovilidadService,
    public TipoConvenioService: TipoConvenioService

  ) {
    this.formularioCrearConvenio = this.formBuilder.group({
      nombre_convenio: ['', Validators.required],
      version_convenio: ['', Validators.required],
      programa_acad: ['', Validators.required],
      promedio: [0, Validators.required],
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

    this.paises = await this.PaisesService.getPais();
    this.institucionesCooperantes = await this.InstitucionCooperanteService.getInstitucionCooperante();
    this.programas = await this.ProgramasService.getProgramaAcademico();
    this.tiposMovilidad = await this.TipoMovilidadService.getTipoMovilidad();
    this.tiposConvenio = await this.TipoConvenioService.getTipoConvenio();


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

}
