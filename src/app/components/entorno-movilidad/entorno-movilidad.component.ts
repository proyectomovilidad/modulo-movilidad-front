import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { EntornoMovilidadService } from './../../services/entorno-movilidad.service';
import {MatDialog} from '@angular/material/dialog';
import {environment} from '../../../environments/environment';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';


@Component({
  selector: 'app-entorno-movilidad',
  templateUrl: './entorno-movilidad.component.html',
  styleUrls: ['./entorno-movilidad.component.css']
})
export class EntornoMovilidadComponent implements OnInit {

  public formfechamovilidadsaliente: FormGroup;
  public formfechamovilidadentrante: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
              private entornoMovilidadService: EntornoMovilidadService,
              private router: Router,
              private dialog: MatDialog,
  ) {
    this.formfechamovilidadsaliente = this.formBuilder.group({
      fecha_inicio_mov_saliente: [Date, Validators.required],
      fecha_final_mov_saliente: [Date, Validators.required],
      periodo: []
    })

    this.formfechamovilidadentrante = this.formBuilder.group({
      fecha_inicio_mov_entrante: [Date, Validators.required],
      fecha_final_mov_entrante: [Date, Validators.required],
      periodo: []
    })
  }

  public entornos_mov:any = []

  ngOnInit(): void {
    const user = environment.user;

    if(!this.route.snapshot.data['roles'].includes(user.rol)){
      this.router.navigateByUrl(environment.unauthorizedPage);
      this.dialog.open(CustomDialogComponent, { data: { code: 403}});
    }
    this.obtenerDatos();
  }

  getNoValidoSaliente(input: string) {
    return this.formfechamovilidadsaliente.get(input).invalid &&
      this.formfechamovilidadsaliente.get(input).touched;
  }


  async guardarFormularioSaliente() {
    if (this.formfechamovilidadsaliente.invalid) {
      return Object.values(this.formfechamovilidadsaliente.controls).forEach(control => {
        control.markAsTouched();
      });
    }


    const fechasMovilidadSaliente = this.formfechamovilidadsaliente.value;
    console.log(fechasMovilidadSaliente)

    const movilidadSaliente = {
      fecha_inicio: fechasMovilidadSaliente.fecha_inicio_mov_saliente.toString(),
      fecha_final: fechasMovilidadSaliente.fecha_final_mov_saliente.toString(),
      periodo: fechasMovilidadSaliente.periodo,
      tipo: 0
    }

    console.log('fecha: ', new Date(fechasMovilidadSaliente.fecha_final_mov_saliente.toString()))

    this.entornoMovilidadService.saveFechasMovilidad(movilidadSaliente).then(res=>{
      this.obtenerDatos();
    });


    this.formfechamovilidadsaliente.reset();

  }

  // MOVILIDAD ENTRANTE

  getNoValidoEntrante(input: string) {
    return this.formfechamovilidadentrante.get(input).invalid &&
      this.formfechamovilidadentrante.get(input).touched;
  }

  async guardarFormularioEntrante() {
    if (this.formfechamovilidadentrante.invalid) {
      return Object.values(this.formfechamovilidadentrante.controls).forEach(control => {
        control.markAsTouched();
      });
    }


    const fechasMovilidadEntrante = this.formfechamovilidadentrante.value;
    console.log(fechasMovilidadEntrante)

    const movilidadEntrante = {

      fecha_inicio: fechasMovilidadEntrante.fecha_inicio_mov_saliente,
      fecha_final: fechasMovilidadEntrante.fecha_final_mov_saliente,
      periodo: fechasMovilidadEntrante.periodo,
      tipo: 1
    }

    const fechasMovEntranteGuardado = await this.entornoMovilidadService.saveFechasMovilidad(movilidadEntrante);
    console.log();

    this.formfechamovilidadentrante.reset();
    this.obtenerDatos();
  }

  limpiarFormularioEntrante() {
    this.formfechamovilidadentrante.reset();
  }

  limpiarFormularioSaliente() {
    this.formfechamovilidadsaliente.reset();
  }

  editar(_id: any) {
    this.router.navigateByUrl('/editar-entorno-movilidad?_id=' + _id);
  }

  eliminarEntorno(_id: any) {
    this.entornoMovilidadService.eliminarEntorno(_id).then( resp => {
      if (resp.status === true) {
        this.obtenerDatos();
      }
    })
  }

  private obtenerDatos() {
    this.entornoMovilidadService.getFechas().then( resp => {
      if (resp.status === true) {
        this.entornos_mov = resp.data;
      }
    })
  }
}
