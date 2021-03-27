import { Component, OnInit } from '@angular/core';
import { ConvocatoriaService } from './../../services/convocatoria.service';
import { ProfesoresService } from './../../services/profesores.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TiposDocumentosIdService } from './../../services/tipos-documentos-id.service';


@Component({
  selector: 'app-profesores-modulo',
  templateUrl: './profesores-modulo.component.html',
  styleUrls: ['./profesores-modulo.component.css']
})
export class ProfesoresModuloComponent implements OnInit {

  public convocatorias: any;
  public profesores: any;
  public tiposDocumento: any;
  public formularioConsultarProfesor: FormGroup;

  constructor(
    private ProfesoresService: ProfesoresService,
    private ConvocatoriaService: ConvocatoriaService,
    private formBuilder: FormBuilder,
    private TiposDocumentosIdService: TiposDocumentosIdService,
    private router: Router,
  ) {
    this.formularioConsultarProfesor = this.formBuilder.group({
      documento_id: [],
      codigo_conv: [],
    });
  }

  async ngOnInit(): Promise<void> {
    this.convocatorias = await this.ConvocatoriaService.getConvocatorias();
    this.profesores = await this.ProfesoresService.getProfesoresConsulta();
    console.log(this.profesores)
  }

  public editarProfesor(id: any) {
    this.router.navigateByUrl('/editar-profesor?_id=' + id);
  }

  getNoValido(input: string) {
    return this.formularioConsultarProfesor.get(input).invalid &&
      this.formularioConsultarProfesor.get(input).touched;
  }

  async consultarProfesor() {
    if (this.formularioConsultarProfesor.invalid) {
      return Object.values(this.formularioConsultarProfesor.controls).forEach(control => {
        control.markAsTouched();
      });
    } 

    const consultarProfesor = this.formularioConsultarProfesor.value;

    const consulta = {
      "profesores.documento_id": consultarProfesor.documento_id,

      "Convocatoria.codigo_conv" /* campo que corresponde a la base de datos*/ : consultarProfesor.codigo_conv, /* nombre del campo del formulario */
    }
    console.log("consulta", consulta)
    this.profesores = await this.ProfesoresService.consultarProfesores(consulta)
    console.log("resultado", this.profesores[1])


  }


  async eliminarProfesor(id: any, obj: any) {
    let respuesta = await this.ProfesoresService.deleteProfesor(id);
    console.log(respuesta);
    if (respuesta.status) {

      this.profesores.splice(this.profesores.indexOf(obj), 1)
    }
  }

}
