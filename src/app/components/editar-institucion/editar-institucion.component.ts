import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaisesService } from './../../services/paises.service';
import { DepartamentosService } from './../../services/departamentos.service';
import { CiudadesService } from './../../services/ciudades.service';
import { InstitucionCooperanteService } from './../../services/institucion-cooperante.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InscripcionEstudianteService } from 'src/app/services/inscripcion-estudiante.service';

@Component({
  selector: 'app-editar-institucion',
  templateUrl: './editar-institucion.component.html',
  styleUrls: ['./editar-institucion.component.css']
})
export class EditarInstitucionComponent implements OnInit {


  public paises: any;
  public departamentos: any;
  public ciudades: any;
  public instituciones: any;
  public estudiantes: any;
  public formularioEditarInstitucionCooperante: FormGroup;

  constructor(
   private router: Router,
   private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public InstitucionCooperanteService: InstitucionCooperanteService,
    public PaisesService: PaisesService,
    public DepartamentosService: DepartamentosService,
    public CiudadesService: CiudadesService,
    public InscripcionEstudianteService: InscripcionEstudianteService) {

   

    this.formularioEditarInstitucionCooperante = this.formBuilder.group({
      nombre_institucion: ['', Validators.required],
      pais: ['', Validators.required],
      departamento: ['', Validators.required],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: [0, Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });
  }

  async ngOnInit(): Promise<void> {
    this.paises =  this.PaisesService.getPais();
    
  } 


  getNoValido(input: string) {
    return this.formularioEditarInstitucionCooperante.get(input).invalid &&
      this.formularioEditarInstitucionCooperante.get(input).touched;
  }

  async guardarFormularioEditado() {
    if (this.formularioEditarInstitucionCooperante.invalid) {
      return Object.values(this.formularioEditarInstitucionCooperante.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    const editarInstitucionCooperante = this.formularioEditarInstitucionCooperante.value;
    console.log(editarInstitucionCooperante)

    const institucionCooperante = {

      nombre_institucion: editarInstitucionCooperante.nombre_institucion,
      pais: editarInstitucionCooperante.pais,
      departamento: editarInstitucionCooperante.departamento,
      ciudad: editarInstitucionCooperante.ciudad,
      direccion: editarInstitucionCooperante.direccion,
      telefono: editarInstitucionCooperante.telefono,
      email: editarInstitucionCooperante.email

    }

    const institucionCooperanteGuardada = await this.InstitucionCooperanteService.saveInstitucionCooperante(institucionCooperante);
    console.log(institucionCooperanteGuardada);

    this.formularioEditarInstitucionCooperante.reset();
  }

  onOptionsSelectedDepartment(codigo_pais: string) {
    this.DepartamentosService.getDepartamentos(codigo_pais).then((state) => {
      this.departamentos = state
    })
  }

  onOptionsSelectedCity(codigo_departamento: string) {
    this.CiudadesService.getCiudades(codigo_departamento).then((cities) => {
      this.ciudades = cities
    })
  }

}
