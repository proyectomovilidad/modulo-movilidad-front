import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditarInstitucionComponent } from './../editar-institucion/editar-institucion.component';
import { PaisesService } from './../../services/paises.service';
import { DepartamentosService } from './../../services/departamentos.service';
import { CiudadesService } from './../../services/ciudades.service';
import { InstitucionCooperanteService } from './../../services/institucion-cooperante.service';
import { Router } from '@angular/router';
import { DatosInstitucionComponent } from './../datos-institucion/datos-institucion.component';


@Component({
  selector: 'app-institucion-cooperantes',
  templateUrl: './institucion-cooperantes.component.html',
  styleUrls: ['./institucion-cooperantes.component.css']
})
export class InstitucionCooperantesComponent implements OnInit {

  public paises: any;
  public departamentos: any;
  public ciudades: any;
  public instituciones: any;
  public institucionesCooperantes: any;


  public formularioInstitucionCooperante: FormGroup;
  constructor(private formBuilder: FormBuilder,

    public InstitucionCooperanteService: InstitucionCooperanteService,
    public PaisesService: PaisesService,
    public DepartamentosService: DepartamentosService,
    public CiudadesService: CiudadesService,
    private router: Router,
    public dialog: MatDialog) {

    this.formularioInstitucionCooperante = this.formBuilder.group({
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
    this.paises = await this.PaisesService.getPais();
    this.institucionesCooperantes = await this.InstitucionCooperanteService.getInstitucionCooperante();
    this.instituciones = await this.InstitucionCooperanteService.getAllInstitucionesCooperantes();
  }

  getNoValido(input: string) {
    return this.formularioInstitucionCooperante.get(input).invalid &&
      this.formularioInstitucionCooperante.get(input).touched;
  }

  async guardarFormulario() {
    if (this.formularioInstitucionCooperante.invalid) {
      return Object.values(this.formularioInstitucionCooperante.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    const crearInstitucionCooperante = this.formularioInstitucionCooperante.value;
    console.log(crearInstitucionCooperante)

    const institucionCooperante = {

      nombre_institucion: crearInstitucionCooperante.nombre_institucion,
      pais: crearInstitucionCooperante.pais,
      departamento: crearInstitucionCooperante.departamento,
      ciudad: crearInstitucionCooperante.ciudad,
      direccion: crearInstitucionCooperante.direccion,
      telefono: crearInstitucionCooperante.telefono,
      email: crearInstitucionCooperante.email

    }

    const institucionCooperanteGuardada = await this.InstitucionCooperanteService.saveInstitucionCooperante(institucionCooperante);
    console.log(institucionCooperanteGuardada);

    this.formularioInstitucionCooperante.reset();
  }

  public editarInstitucion(id: any) {
    this.router.navigateByUrl('/editar-institucion?_id=' + id);
  }
    

  abrirEditarInstitucion(institucion) {
    console.log(institucion)
    this.dialog.open(EditarInstitucionComponent, institucion);
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
