import { Component, OnInit } from '@angular/core';
import { TipoMovilidadService } from './../../services/tipo-movilidad.service';
import { InstitucionCooperanteService } from './../../services/institucion-cooperante.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InscripcionExternoService } from './../../services/inscripcion-externo.service';

@Component({
  selector: 'app-externos-movilidad',
  templateUrl: './externos-movilidad.component.html',
  styleUrls: ['./externos-movilidad.component.css']
})
export class ExternosMovilidadComponent implements OnInit {

  public tiposMovilidad: any;
  public instituciones: any;
  public formularioDocumentos: FormGroup;
  public externos: any;
  public academic: any;
  public consulta: any;
  public formularioConsultarExterno: FormGroup;
  public estados = [
    {val: -1, nm: 'No Inscrito'},
    {val: 0, nm: 'Cancelado'},
    {val: 1, nm:"Inscrito"},
    {val: 2, nm:"Carga documentos"},
    {val: 3, nm:"Movilidad"},
    {val: 4, nm:"Finalizado"},
    {val: 5, nm:"Prorroga"},    
  ]

  constructor(
    public TipoMovilidadService: TipoMovilidadService,
    public InstitucionCooperanteService: InstitucionCooperanteService,
    private formBuilder: FormBuilder,

    private router: Router,
    private inscripcionExternoService: InscripcionExternoService) {

    this.formularioConsultarExterno = this.formBuilder.group({

      documento_id: [],
      ano_inscrip: [],
      periodo_inscrip: [],
      tipo_movilidad: [],
      nombre_institucion: []
    });
  } 

  async ngOnInit(): Promise<void> {

    this.tiposMovilidad = await this.TipoMovilidadService.getTipoMovilidad();
    this.instituciones = await this.InstitucionCooperanteService.getInstitucionCooperante();
    this.externos = await this.inscripcionExternoService.getAspirantesExtPersonal();
    this.academic = await this.inscripcionExternoService.getAllAspExternoAcademic();
  }

  public editarInscripcion(id: any) {
    this.router.navigateByUrl('/editar-externo?_id=' + id);
  }

  getNoValido(input: string) {
    return this.formularioConsultarExterno.get(input).invalid &&
      this.formularioConsultarExterno.get(input).touched;
  }

  public cambiarEstado(e, inscripcionId){
    if(e.value){
      this.inscripcionExternoService.cambiarEstadoInscripcionById({estado: e.value}, inscripcionId).then(resp=>{
        console.log('actualizado: ',resp)
      })
    }
  }


  async consultarExterno() {
    if (this.formularioConsultarExterno.invalid) {
      return Object.values(this.formularioConsultarExterno.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    const consultarExterno = this.formularioConsultarExterno.value;
    console.log(consultarExterno)


    const consulta = {
      "aspExtPersonal.documento_id": consultarExterno.documento_id,

      "aspExtAcademic.ano_inscrip": consultarExterno.ano_inscrip,
      "aspExtAcademic.periodo_inscrip": consultarExterno.periodo_inscrip,

      "TipoMovilidad._id": consultarExterno.tipo_movilidad,
      "InstitucionCooperante._id": consultarExterno.nombre_institucion

    }

    this.externos = await this.inscripcionExternoService.consultarExternos(consulta)
    console.log("resultado", this.externos)

  }

  async eliminarInscripcion(id: any, obj: any) {
    let respuesta = await this.inscripcionExternoService.deleteInscripcion(id);
    console.log(respuesta);
    if (respuesta.status) {

      this.externos.splice(this.externos.indexOf(obj), 1)
    }

  }

  visualizar(id){
    this.router.navigateByUrl(`/visualizar-externo?_id=${id}`)
  }
}
