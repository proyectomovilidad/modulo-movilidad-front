import { Component, OnInit } from '@angular/core';
import { TipoMovilidadService } from './../../services/tipo-movilidad.service';
import { InstitucionCooperanteService } from './../../services/institucion-cooperante.service';
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InscripcionEstudianteService } from 'src/app/services/inscripcion-estudiante.service';
import {environment} from '../../../environments/environment';
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-estudiantes-movilidad',
  templateUrl: './estudiantes-movilidad.component.html',
  styleUrls: ['./estudiantes-movilidad.component.css']
})
export class EstudiantesMovilidadComponent implements OnInit {

  public tiposMovilidad: any;
  public movilidad: any;
  public instituciones: any;
  public formularioDocumentos: FormGroup;
  public estudiantes: any;
  public academic: any;
  public consulta: any;
  public estados = [
    {val: -1, nm: 'No Inscrito'},
    {val: 0, nm: 'Cancelado'},
    {val: 1, nm:"Inscrito"},
    {val: 2, nm:"Carga documentos"},
    {val: 3, nm:"Postulado"},
    {val: 4, nm:"Movilidad"},
    {val: 5, nm:"Prorroga"},
    {val: 5, nm:"Finalizado"},
  ]

  public formularioConsultarEstudiante: FormGroup;
  constructor(

    public TipoMovilidadService: TipoMovilidadService,
    public InstitucionCooperanteService: InstitucionCooperanteService,
    private formBuilder: FormBuilder,

    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private inscripcionEstudianteService: InscripcionEstudianteService) {

    this.formularioConsultarEstudiante = this.formBuilder.group({
      codigo_est: [],
      ano_inscrip: [],
      periodo_inscrip: [],
      tipo_movilidad: [],
      nombre_institucion: []

    });
  }

  async ngOnInit(): Promise<void> {
    const user = environment.user;

    if(!this.route.snapshot.data['roles'].includes(user.rol)){
      this.router.navigateByUrl(environment.unauthorizedPage);
      this.dialog.open(CustomDialogComponent, { data: { code: 403}});
    }
    this.tiposMovilidad = await this.TipoMovilidadService.getTipoMovilidad();
    this.instituciones = await this.InstitucionCooperanteService.getInstitucionCooperante();

    this.inscripcionEstudianteService.getAspirantesUisPersonal().then(resp=>{

      if(resp.status == true){
          this.estudiantes = resp.estudiantes
      }else if(resp.permiso == false){
        this.router.navigateByUrl('/')
      }
    });
    this.academic = await this.inscripcionEstudianteService.getAllAspUisAcademic();
    console.log('estudiantes: ', this.estudiantes);
  }


  public editarInscripcion(id: any) {
    this.router.navigateByUrl('/editar-inscripcion?_id=' + id);
    // this.router.navigateByUrl('/editar-inscripcion/' + id);
  }


  public cambiarEstado(e, inscripcionId){
    if(e.value){
      this.inscripcionEstudianteService.cambiarEstadoInscripcionById({estado: e.value}, inscripcionId).then(resp=>{
        console.log('actualizado: ',resp)
      })
    }
  }


  getNoValido(input: string) {
    return this.formularioConsultarEstudiante.get(input).invalid &&
      this.formularioConsultarEstudiante.get(input).touched;
  }

  async consultarEstudiante() {
    if (this.formularioConsultarEstudiante.invalid) {
      return Object.values(this.formularioConsultarEstudiante.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    const consultarEstudiante = this.formularioConsultarEstudiante.value;
    console.log(consultarEstudiante)


    const consulta = {
      "aspUisPersonal.codigo_est": consultarEstudiante.codigo_est,

      "aspUisAcademic.ano_inscrip": consultarEstudiante.ano_inscrip,
      "aspUisAcademic.periodo_inscrip": consultarEstudiante.periodo_inscrip,

      "TipoMovilidad._id": consultarEstudiante.tipo_movilidad,
      "InstitucionCooperante._id": consultarEstudiante.nombre_institucion

    }
    console.log("resultado", consulta)
    this.estudiantes = await this.inscripcionEstudianteService.consultarEstudiantes(consulta)
    console.log("resultado", this.estudiantes)

  }


  async eliminarInscripcion(id: any, obj: any) {
    let respuesta = await this.inscripcionEstudianteService.deleteInscripcion(id);
    console.log(respuesta);
    if (respuesta.status) {

      this.estudiantes.splice(this.estudiantes.indexOf(obj), 1)
    }

  }

  visualizar(id){
    this.router.navigateByUrl('/visualizar-estudiante?_id=' + id);
  }

  public async cnacelarConsulta() {
    this.formularioConsultarEstudiante.reset();
    this.estudiantes = await this.inscripcionEstudianteService.consultarEstudiantes({});
  }

}

