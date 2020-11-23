import { Component, OnInit } from '@angular/core';
import { TipoMovilidadService } from './../../services/tipo-movilidad.service';
import { InstitucionCooperanteService } from './../../services/institucion-cooperante.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup} from '@angular/forms';
import { InscripcionEstudianteService } from 'src/app/services/inscripcion-estudiante.service';

@Component({
  selector: 'app-estudiantes-movilidad',
  templateUrl: './estudiantes-movilidad.component.html',
  styleUrls: ['./estudiantes-movilidad.component.css']
})
export class EstudiantesMovilidadComponent implements OnInit {

  public tiposMovilidad: any;
  public instituciones: any;
  public formularioDocumentos: FormGroup;
  public estudiantes: any;

  constructor(
 
    public TipoMovilidadService: TipoMovilidadService,
    public InstitucionCooperanteService: InstitucionCooperanteService,
    private formBuilder: FormBuilder,
    private router: Router,
    private inscripcionEstudianteService: InscripcionEstudianteService) 

     { }

  async ngOnInit(): Promise<void> {

    this.tiposMovilidad = await this.TipoMovilidadService.getTipoMovilidad();
    this.instituciones = await this.InstitucionCooperanteService.getInstitucionCooperante();
    this.estudiantes = await this.inscripcionEstudianteService.getAllAspUisPersonal();

        
  }

  public editarInscripcion(id: any) {
    this.router.navigateByUrl('/editar-inscripcion?_id=' + id);
   // this.router.navigateByUrl('/editar-inscripcion/' + id);
  }
    



}

