import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EntornoMovilidadService } from './../../services/entorno-movilidad.service';


@Component({
  selector: 'app-entorno-movilidad',
  templateUrl: './entorno-movilidad.component.html',
  styleUrls: ['./entorno-movilidad.component.css']
})
export class EntornoMovilidadComponent implements OnInit {

  private EntornoMovilidadService: EntornoMovilidadService
  public formfechamovilidadsaliente: FormGroup;
  public formfechamovilidadentrante: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,) {
    this.formfechamovilidadsaliente = this.formBuilder.group({
      fecha_inicio_mov_saliente: [Date, Validators.required],
      fecha_final_mov_saliente: [Date, Validators.required],
    })

    this.formfechamovilidadentrante = this.formBuilder.group({
      fecha_inicio_mov_entrante: [Date, Validators.required],
      fecha_final_mov_entrante: [Date, Validators.required],
    })
  }

  ngOnInit(): void {
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

      fecha_inicio_mov_saliente: fechasMovilidadSaliente.fecha_inicio_mov_saliente,
      fecha_final_mov_saliente: fechasMovilidadSaliente.fecha_final_mov_saliente
    }

    const fechasMovSalienteGuardado = await this.EntornoMovilidadService.saveFechasMovSaliente(movilidadSaliente);
    console.log();

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

      fecha_inicio_mov_saliente: fechasMovilidadEntrante.fecha_inicio_mov_saliente,
      fecha_final_mov_saliente: fechasMovilidadEntrante.fecha_final_mov_saliente
    }

    const fechasMovEntranteGuardado = await this.EntornoMovilidadService.saveFechasMovEntrante(movilidadEntrante);
    console.log();

    this.formfechamovilidadentrante.reset();

  }

} 
