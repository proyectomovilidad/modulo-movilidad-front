import { Component, OnInit } from '@angular/core';
import { ConvocatoriaService } from './../../services/convocatoria.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfesoresService } from './../../services/profesores.service';
import { Router } from '@angular/router';
import { TiposDocumentosIdService } from './../../services/tipos-documentos-id.service';


@Component({
  selector: 'app-editar-profesor',
  templateUrl: './editar-profesor.component.html',
  styleUrls: ['./editar-profesor.component.css']
})
export class EditarProfesorComponent implements OnInit {

  public convocatorias: any;
  public profesores: any;
  public tiposDocumento: any;

  public formularioEditarProfesor: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private ProfesoresService: ProfesoresService,
    private  ConvocatoriaService: ConvocatoriaService,
    private TiposDocumentosIdService: TiposDocumentosIdService,
    private router: Router,) { 


      this.formularioEditarProfesor = this.formBuilder.group({
        tipo_doc_id: ['', Validators.required],
        documento_id: [0, Validators.required],
        primer_nombre: ['', Validators.required],
        primer_apellido: ['', Validators.required],
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

      tipo_doc_id: editarProfesor.tipo_doc_id ,
      documento_id:editarProfesor.documento_id,
      primer_nombre:editarProfesor.primer_nombre,
      primer_apellido:editarProfesor.primer_apellido,
      genero:editarProfesor.genero,
      nombre_convocatoria: editarProfesor.nombre_convocatoria,
      actividad:editarProfesor.actividad,
      duracion:editarProfesor.duracion ,
      periodo_inscrip:editarProfesor.periodo_inscrip,
      ano_inscrip:editarProfesor.ano_inscrip,
      fecha_inscripcion:editarProfesor.fecha_inscripcion ,
      celular:editarProfesor.celular,
      correo: editarProfesor.correo, 
      financiacion: editarProfesor.financiacion,
      tipo_recursos: editarProfesor.tipo_recursos ,

    }

    const profesorEditado = await this.ProfesoresService.saveProfesores(profesor);
    console.log(profesorEditado);

}
}
