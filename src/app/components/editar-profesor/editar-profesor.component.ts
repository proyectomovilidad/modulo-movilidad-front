import { Component, OnInit } from '@angular/core';
import { ConvocatoriaService } from './../../services/convocatoria.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfesoresService } from './../../services/profesores.service';
import { Router } from '@angular/router';
import { TiposDocumentosIdService } from './../../services/tipos-documentos-id.service';
import { ActivatedRoute } from '@angular/router';
import {environment} from '../../../environments/environment';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-editar-profesor',
  templateUrl: './editar-profesor.component.html',
  styleUrls: ['./editar-profesor.component.css']
})
export class EditarProfesorComponent implements OnInit {

  public convocatorias: any;
  public profesores: any;
  public tiposDocumento: any;
  public convenios: any;
  public profesorElegido: any;
  public inscritos: any;

  public formularioEditarProfesor: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private ProfesoresService: ProfesoresService,
    private ConvocatoriaService: ConvocatoriaService,
    private TiposDocumentosIdService: TiposDocumentosIdService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,
  ) {

    this.formularioEditarProfesor = this.formBuilder.group({
      tipo_doc_id: ['', Validators.required],
      documento_id: [0, Validators.required],
      primer_nombre: ['', Validators.required],
      segundo_nombre: [''],
      primer_apellido: ['', Validators.required],
      segundo_apellido: [''],
      genero: ['', Validators.required],
      codigo_conv: ['', Validators.required],
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
    const user = environment.user;

    if(!this.route.snapshot.data['roles'].includes(user.rol)){
      this.router.navigateByUrl(environment.unauthorizedPage);
      this.dialog.open(CustomDialogComponent, { data: { code: 403}});
    }

    this.profesores = await this.ProfesoresService.getAllProfesores();
    this.convocatorias = await this.ConvocatoriaService.getConvocatorias();
    this.tiposDocumento = await this.TiposDocumentosIdService.getTipoDocumentoId();


    const id = this.route.snapshot.queryParams._id
    this.inscritos = await this.ProfesoresService.getProfesor(id);
    console.log("validaprofesore", this.inscritos)

    if (this.inscritos[0]) {
      const profesor = this.inscritos[0];
      this.profesorElegido = profesor;

      this.formularioEditarProfesor.controls.tipo_doc_id.setValue(profesor.tipo_doc_id);
      this.formularioEditarProfesor.controls.documento_id.setValue(profesor.documento_id);
      this.formularioEditarProfesor.controls.primer_nombre.setValue(profesor.primer_nombre);
      this.formularioEditarProfesor.controls.segundo_nombre.setValue(profesor.segundo_nombre);
      this.formularioEditarProfesor.controls.primer_apellido.setValue(profesor.primer_apellido);
      this.formularioEditarProfesor.controls.segundo_apellido.setValue(profesor.segundo_apellido);
      this.formularioEditarProfesor.controls.genero.setValue(profesor.genero);
      this.formularioEditarProfesor.controls.actividad.setValue(profesor.actividad);
      this.formularioEditarProfesor.controls.codigo_conv.setValue(profesor.codigo_conv);
      this.formularioEditarProfesor.controls.duracion.setValue(profesor.duracion);
      this.formularioEditarProfesor.controls.periodo_inscrip.setValue(profesor.periodo_inscrip);
      this.formularioEditarProfesor.controls.ano_inscrip.setValue(profesor.ano_inscrip);
      this.formularioEditarProfesor.controls.fecha_inscripcion.setValue(profesor.fecha_inscripcion);
      this.formularioEditarProfesor.controls.celular.setValue(profesor.celular);
      this.formularioEditarProfesor.controls.correo.setValue(profesor.correo);
      this.formularioEditarProfesor.controls.financiacion.setValue(profesor.financiacion);
      this.formularioEditarProfesor.controls.tipo_recursos.setValue(profesor.tipo_recursos);

    }


  }

  getNoValido(input: string) {
    return this.formularioEditarProfesor.get(input).invalid &&
      this.formularioEditarProfesor.get(input).touched;
  }

  async guardarFormulario() {
    if (this.formularioEditarProfesor.invalid) {
      return Object.values(this.formularioEditarProfesor.controls).forEach(control => {
        control.markAsTouched();
      });
    }


    const editarProfesor = this.formularioEditarProfesor.value;
    console.log(editarProfesor)


    const profesor = {
      tipo_doc_id: editarProfesor.tipo_doc_id,
      documento_id: editarProfesor.documento_id,
      primer_nombre: editarProfesor.primer_nombre,
      segundo_nombre: editarProfesor.segundo_nombre,
      primer_apellido: editarProfesor.primer_apellido,
      segundo_apellido: editarProfesor.segundo_apellido,
      genero: editarProfesor.genero,
      codigo_conv: editarProfesor.codigo_conv,
      actividad: editarProfesor.actividad,
      duracion: editarProfesor.duracion,
      periodo_inscrip: editarProfesor.periodo_inscrip,
      ano_inscrip: editarProfesor.ano_inscrip,
      fecha_inscripcion: editarProfesor.fecha_inscripcion,
      celular: editarProfesor.celular,
      correo: editarProfesor.correo,
      financiacion: editarProfesor.financiacion,
      tipo_recursos: editarProfesor.tipo_recursos,

    }

    const profesorEditado = await this.ProfesoresService.updateProfesor(profesor, this.profesorElegido._id);
    console.log(profesorEditado);

  }

  public cancelarEdicion() {
    this.router.navigateByUrl('/profesores-movilidad');
  }
}
