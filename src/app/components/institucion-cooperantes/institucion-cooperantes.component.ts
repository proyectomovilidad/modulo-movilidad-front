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
import {CustomDialogComponent} from '../custom-dialog/custom-dialog.component';


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
  public formConsulta: FormGroup;
  public ciudadesD: any;

  constructor(private formBuilder: FormBuilder,
              public InstitucionCooperanteService: InstitucionCooperanteService,
              public PaisesService: PaisesService,
              public DepartamentosService: DepartamentosService,
              public CiudadesService: CiudadesService,
              private router: Router,
              public dialog: MatDialog
  ) {
    this.formularioInstitucionCooperante = this.formBuilder.group({
      nombre_institucion: ['', Validators.required],
      pais: ['', Validators.required],
      departamento: ['', Validators.required],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: [0, Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });

    this.formConsulta = this.formBuilder.group({
      _id: [''],
      nombre_institucion: [''],
      pais: [''],
      departamento: [''],
      ciudad: [''],
      email: ['']
    });

  }


  async ngOnInit(): Promise<void> {
    this.paises = await this.PaisesService.getPais();
    this.CiudadesService.getAllCiudades().then(resp => {
      if (resp.status === true) {
        this.ciudadesD = resp.data;
      }
    });
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

    let code = institucionCooperanteGuardada._id ? 201 : 210;

    this.dialog.open(CustomDialogComponent, { data: { code: code, message: institucionCooperanteGuardada.message}});
    this.instituciones = await this.InstitucionCooperanteService.getAllInstitucionesCooperantes();


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

  async eliminarInstitucionCooperante(id: any, obj: any) {
    let respuesta = await this.InstitucionCooperanteService.deleteInstitucionCooperante(id);
    console.log(respuesta);
    let code = 213;
    if (respuesta.status === true) {
      this.instituciones.splice(this.instituciones.indexOf(obj), 1);
      code = 214;
    }
    this.dialog.open(CustomDialogComponent, { data: { code: code, message: respuesta.message}});
  }

  consultar() {
    const dataForm = this.formConsulta.value;

    const consulta = {
      "_id": dataForm._id,
      "nombre_institucion": dataForm.nombre_institucion,
      "pais": dataForm.pais,
      "departamento": dataForm.departamento,
      "ciudad": dataForm.ciudad,
      "email": dataForm.email
    }

    this.InstitucionCooperanteService.consultar(consulta).then(resp => {
      if (resp.status == true) {
        this.instituciones = resp.data;
      }
    });
  }

  cancelarConsulta() {
    this.InstitucionCooperanteService.consultar({}).then(resp => {
      if (resp.status == true) {
        this.instituciones = resp.data;
      }
    });

    this.formConsulta.reset();
  }

  getPais(codigo) {
    const pais = this.paises.find(x => x.codigo_pais == codigo) || {nombre_pais: '--No existe--'}
    return pais.nombre_pais
  }

  getCiudad(id){
    console.log(this.ciudadesD)
    const result = this.ciudadesD.find(x=> x._id == id)

    return result ? result.nombre_ciudad : '-No Existe-'
  }
}
