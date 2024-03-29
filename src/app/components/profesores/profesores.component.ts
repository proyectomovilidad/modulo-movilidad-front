import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfesoresService } from './../../services/profesores.service';
import { Router } from '@angular/router';
import { TiposDocumentosIdService } from './../../services/tipos-documentos-id.service';
import { ConvocatoriaService } from './../../services/convocatoria.service';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {
  public convocatorias: any;
  public profesores: any;
  public tiposDocumento: any;


  public formularioInscripcionProfesor: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private ProfesoresService: ProfesoresService,
    private  ConvocatoriaService: ConvocatoriaService,
    private TiposDocumentosIdService: TiposDocumentosIdService,
    private router: Router,
              public dialog: MatDialog
  ) {

    this.formularioInscripcionProfesor = this.formBuilder.group({
      tipo_doc_id: ['', Validators.required],
      documento_id: [0, Validators.required],
      primer_nombre: ['', Validators.required],
      segundo_nombre: [''],
      primer_apellido: ['', Validators.required],
      segundo_apellido: [''],
      genero: ['', Validators.required],
      nombre_convocatoria: ['', Validators.required],
      actividad: ['', Validators.required],
      duracion: ['', Validators.required],
      periodo_inscrip: ['', Validators.required],
      ano_inscrip: ['', Validators.required],
      fecha_inscripcion: [Date, Validators.required],
      celular: [0, Validators.required],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      financiacion: ['', Validators.required],
      tipo_recursos: ['', Validators.required],


    });
  }

  async ngOnInit(): Promise<void> {
    this.profesores = await this.ProfesoresService.getAllProfesores();
    this.convocatorias = await this.ConvocatoriaService.getConvocatorias();
    this.tiposDocumento = await this.TiposDocumentosIdService.getTipoDocumentoId();
  }

  getNoValido(input: string) {
    return this.formularioInscripcionProfesor.get(input).invalid &&
      this.formularioInscripcionProfesor.get(input).touched;
  }

  async guardarFormulario() {
    if (this.formularioInscripcionProfesor.invalid) {
      return Object.values(this.formularioInscripcionProfesor.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    const inscribirProfesor = this.formularioInscripcionProfesor.value;
    console.log(inscribirProfesor)


    const profesor = {

      tipo_doc_id: inscribirProfesor.tipo_doc_id ,
      documento_id:inscribirProfesor.documento_id,
      primer_nombre:inscribirProfesor.primer_nombre,
      segundo_nombre:inscribirProfesor.segundo_nombre,
      primer_apellido:inscribirProfesor.primer_apellido,
      segundo_apellido:inscribirProfesor.segundo_apellido,
      genero:inscribirProfesor.genero,
      nombre_convocatoria: inscribirProfesor.nombre_convocatoria,
      actividad:inscribirProfesor.actividad,
      duracion:inscribirProfesor.duracion ,
      periodo_inscrip:inscribirProfesor.periodo_inscrip,
      ano_inscrip:inscribirProfesor.ano_inscrip,
      fecha_inscripcion:inscribirProfesor.fecha_inscripcion ,
      celular:inscribirProfesor.celular,
      correo: inscribirProfesor.correo,
      financiacion: inscribirProfesor.financiacion,
      tipo_recursos: inscribirProfesor.tipo_recursos ,

    }

    const profesorGuardado = await this.ProfesoresService.saveProfesores(profesor);
    console.log(profesorGuardado);
    let code = profesorGuardado._id ? 201 : 210;
    this.dialog.open(CustomDialogComponent, { data: { code: code}});


    this.formularioInscripcionProfesor.reset();
  }

  limpiarFormulario() {
    this.formularioInscripcionProfesor.reset();
  }

}
