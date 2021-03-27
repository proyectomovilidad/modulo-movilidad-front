import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { InstitucionCooperanteService } from './../../services/institucion-cooperante.service';
import { ConvocatoriaService } from './../../services/convocatoria.service';
import { TipoProyectoService } from './../../services/tipo-proyecto.service';

@Component({
  selector: 'app-convocatoria',
  templateUrl: './convocatoria.component.html',
  styleUrls: ['./convocatoria.component.css']
})
export class ConvocatoriaComponent implements OnInit {

  public institucionesCooperantes: any;
  public tiposProyecto: any;

  public formularioCrearConvocatoria: FormGroup;



  constructor(private formBuilder: FormBuilder,  
    public InstitucionCooperanteService: InstitucionCooperanteService,
    public ConvocatoriaService: ConvocatoriaService,
    public TipoProyectoService:TipoProyectoService,
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
  }

 async ngOnInit(): Promise<void> {
    this.institucionesCooperantes = await this.InstitucionCooperanteService.getInstitucionCooperante();
    this.tiposProyecto = await this.TipoProyectoService.getTiposProyecto();

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

      nombre_convocatoria: crearConvocatoria.nombre_convocatoria ,
      estado_convocatoria:crearConvocatoria.estado_convocatoria ,
      periodo_convocatoria: crearConvocatoria.periodo_convocatoria,
      fecha_inicio:crearConvocatoria.fecha_inicio ,
      fecha_final:crearConvocatoria.fecha_final ,
      fecha_suscripcion:crearConvocatoria.fecha_suscripcion ,
      nombre_institucion:crearConvocatoria.nombre_institucion ,
      tipo_proyecto:crearConvocatoria.tipo_proyecto ,    
      link_inscripcion:crearConvocatoria.link_inscripcion ,
    }
    const convocatoriaGuardada = await this.ConvocatoriaService.saveConvocatoria(convocatoria);
    console.log(convocatoriaGuardada);

    this.formularioCrearConvocatoria.reset();

}
}

 